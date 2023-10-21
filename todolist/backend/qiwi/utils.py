import requests
import uuid
import datetime
from .credentials import PRIVATE_KEY
import pytz


BASE_URL = 'https://api.qiwi.com/partner/bill/v1/bills/'

current_datetime = datetime.datetime.utcnow()
expiration_datetime = current_datetime + datetime.timedelta(minutes=60)
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
        "expirationDateTime": expiration_datetime_str,
        "customFields": {
            "paySourcesFilter": "qw",
            "themeCode": "Yvan-YKaSh",
        },
    }
    url = f'https://api.qiwi.com/partner/bill/v1/bills/{billid}'
    response = requests.put(url=url, json=params, headers=headers).json()
    
    return response

def reject_invoice(billid):
    headers = {
        "Authorization": "Bearer " + PRIVATE_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    params = {
        "billid": billid,        
    }
    url = f'https://api.qiwi.com/partner/bill/v1/bills/{billid}/reject'
    
    response = requests.post(url=url, json=params, headers=headers).json()
    
    return response

def check_invoice(billid):
    headers = {
        "Accept": "application/json",
        "Authorization": "Bearer " + PRIVATE_KEY,
    }
    params = {
        "billid": billid,
    }
    url = f'https://api.qiwi.com/partner/bill/v1/bills/{billid}'
    response = requests.get(url=url, json=params, headers=headers).json()
    
    status = response['status']
    value = status['value']
    
    return value