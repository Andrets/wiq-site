import requests
import uuid
import datetime
from .credentials import PRIVATE_KEY
import pytz


BASE_URL = 'https://api.qiwi.com/partner/bill/v1/bills/'

current_datetime = datetime.datetime.utcnow()
expiration_datetime = current_datetime + datetime.timedelta(days=1)
expiration_datetime = expiration_datetime.replace(tzinfo=pytz.UTC)
expiration_datetime_str = expiration_datetime.isoformat()

def invoice_order(billid, amount_currency, amount_value):
    headers = {
        "Authorization": "Bearer " + PRIVATE_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    params = {
        "amount": {
            "currency": amount_currency,
            "value": amount_value,
        },
        "expirationDateTime": expiration_datetime_str
    }
    url = f'https://api.qiwi.com/partner/bill/v1/bills/{billid}'
    response = requests.put(url=url, json=params, headers=headers).json()
    
    return response