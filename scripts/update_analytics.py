#!/usr/bin/env python3
import json
import os
import time
from pathlib import Path

import google.auth.transport.requests
from google.oauth2 import service_account

PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "514206699")
WAIT_SECONDS = int(os.getenv("GA4_WAIT_SECONDS", "60"))

ROOT = Path(__file__).resolve().parent.parent
ANALYTICS_FILE = ROOT / "analytics.json"
EVENTS_FILE = ROOT / "eventosclaves.json"



def _get_credentials() -> service_account.Credentials:
    raw = os.getenv("GA_SERVICE_ACCOUNT_JSON")
    if not raw:
        raise RuntimeError("Falta GA_SERVICE_ACCOUNT_JSON en variables de entorno.")

    info = json.loads(raw)
    return service_account.Credentials.from_service_account_info(
        info,
        scopes=["https://www.googleapis.com/auth/analytics.readonly"],
    )



def _run_report(session: google.auth.transport.requests.AuthorizedSession, payload: dict) -> dict:
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport"
    response = session.post(url, json=payload, timeout=30)
    response.raise_for_status()
    return response.json()



def update_analytics_summary(session: google.auth.transport.requests.AuthorizedSession) -> None:
    payload = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
        "metrics": [
            {"name": "activeUsers"},
            {"name": "sessions"},
            {"name": "screenPageViews"},
            {"name": "userEngagementDuration"},
            {"name": "bounceRate"},
            {"name": "conversions"},
            {"name": "sessionConversionRate"},
        ],
    }

    report = _run_report(session, payload)
    rows = report.get("rows", [])

    if not rows or "metricValues" not in rows[0]:
        output = {"error": "Sin datos desde GA4"}
    else:
        metric_values = rows[0]["metricValues"]

        usuarios = float(metric_values[0].get("value", 0))
        sesiones = float(metric_values[1].get("value", 0))
        paginas_vistas = float(metric_values[2].get("value", 0))
        interaccion_seg = float(metric_values[3].get("value", 0))
        rebote_ratio = float(metric_values[4].get("value", 0))
        conversiones = float(metric_values[5].get("value", 0))
        conv_ratio = float(metric_values[6].get("value", 0))

        def _number(value: float):
            return int(value) if value.is_integer() else value

        output = {
            "usuarios": _number(usuarios),
            "sesiones": _number(sesiones),
            "paginas_vistas": _number(paginas_vistas),
            "interaccion_media_seg": _number(interaccion_seg),
            "rebote": rebote_ratio * 100,
            "conversiones": _number(conversiones),
            "tasa_conversion": conv_ratio * 100,
            "trafico_organico": None,
        }

    ANALYTICS_FILE.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")



def update_key_events(session: google.auth.transport.requests.AuthorizedSession) -> None:
    payload = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
        "dimensions": [{"name": "date"}, {"name": "eventName"}],
        "metrics": [{"name": "eventCount"}],
        "dimensionFilter": {
            "filter": {
                "fieldName": "eventName",
                "inListFilter": {"values": ["click_whatsapp", "tito_chat_message"]},
            }
        },
    }

    report = _run_report(session, payload)
    rows = report.get("rows", [])

    eventos = []
    for row in rows:
        date_raw = row["dimensionValues"][0]["value"]
        event_name = row["dimensionValues"][1]["value"]
        count = int(row["metricValues"][0]["value"])

        fecha = f"{date_raw[0:4]}-{date_raw[4:6]}-{date_raw[6:8]}"
        eventos.append({"fecha": fecha, "evento": event_name, "cantidad": count})

    output = {"rango": "ultimos_30_dias", "eventos": eventos}
    EVENTS_FILE.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")



def main() -> None:
    credentials = _get_credentials()
    auth_request = google.auth.transport.requests.Request()
    credentials.refresh(auth_request)
    session = google.auth.transport.requests.AuthorizedSession(credentials)

    update_key_events(session)
    if WAIT_SECONDS > 0:
        time.sleep(WAIT_SECONDS)
    update_analytics_summary(session)


if __name__ == "__main__":
    main()
