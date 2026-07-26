from backend.app.auth.hashing import hash_password, verify_password

password = "Password@123"

hashed = hash_password(password)

print("Original:", password)
print("Hashed :", hashed)

print(verify_password(password, hashed))
print(verify_password("WrongPassword", hashed))