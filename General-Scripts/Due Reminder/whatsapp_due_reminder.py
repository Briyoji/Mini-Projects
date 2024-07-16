import pywhatkit as chat
import json

with open('./to_collect.json', 'r') as contacts:
    data = json.load(contacts)

for contact in data: 
    name = data[contact]["name"]
    phone = data[contact]["phone"]
    amount = data[contact]["amount"]
    received = data[contact]["received"]

    message = f"Hey {name},\n_This is an automated message._\nThis is to remind you that you have some pending transactions which sum up to *{amount-received}*.\nA breakdown may be provided if you want it.\nTHanks <3"

    chat.sendwhatmsg_instantly(phone, message, 15, True, 2)
