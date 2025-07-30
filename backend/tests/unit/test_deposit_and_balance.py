def test_deposit_and_balance(client):
    acc = 123
    response = client.post(f"/accounts/{acc}/deposit", json={"amount": 100})
    assert response.status_code == 200
    assert response.json()["balance"] == 100

    response = client.get(f"/accounts/{acc}/balance")
    assert response.status_code == 200
    assert response.json()["balance"] == 100

def test_withdraw(client):
    acc = 456
    # Start with deposit
    client.post(f"/accounts/{acc}/deposit", json={"amount": 50})

    # Valid withdrawal
    response = client.post(f"/accounts/{acc}/withdraw", json={"amount": 20})
    assert response.status_code == 200
    assert response.json()["balance"] == 30

    # Overdraw
    response = client.post(f"/accounts/{acc}/withdraw", json={"amount": 100})
    assert response.status_code == 400