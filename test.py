from backend.app.auth.jwt_handler import create_access_token

token = create_access_token(
    {
        "sub": "john@gmail.com"
    }
)

print(token)