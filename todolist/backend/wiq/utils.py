import requests
import json
from .credentials import API_KEY

BASE_URL = 'https://wiq.ru/api/'
    

def get_order(order):
    params = {
        "key": API_KEY,
        "action": "status",
        "order": order
    }
    response = requests.get(url=BASE_URL, params=params).json()
    
    return response


def create_order(service, quantity, nickname):
    params = {
        "key": API_KEY,
        "action": "create",
        "service": service,
        "quantity": quantity,
        "link": "https://instagram.com/" + nickname,
    }
    response = requests.get(url=BASE_URL, params=params)

    if response.status_code == 200:
        try:
            json_response = response.json()
        except json.JSONDecodeError:
            json_response = {"error": "Invalid JSON response"}
    else:
        json_response = {"error": f"Server returned {response.status_code} status code"}

    return json_response

def get_insta_subs_service():
    params = {
        "key": API_KEY,
        "action": "services"
    }
    
    response = requests.get(url=BASE_URL, params=params).json()
    filtered_response = [
        item for item in response if isinstance(item, dict) and "category" in item and item["category"] == "19"
    ]
    
    return filtered_response

def cancel_order(order):
    params = {
        "key": API_KEY,
        "action": "cancel",
        "order": order,
    }
    
    response = requests.get(url=BASE_URL, params=params).json()
    #filtered_response = [
    #    item for item in response if item["cancel"] == "ok"
    #]
    return response

def refill_order(order):
    params = {
        "key": API_KEY,
        "action": "refill",
        "order": order,
    }
    
    response = requests.get(BASE_URL, params=params).json()
    return response

def get_balance():
    params = {
        "key": API_KEY,
        "action": "balance"
    }
    
    response = requests.get(BASE_URL, params=params).json()
    
    return response