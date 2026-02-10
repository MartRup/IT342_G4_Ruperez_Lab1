package com.example.miniapp.data.model

data class User(
    val id: Long? = null,
    val username: String,
    val email: String,
    val password: String? = null,
    val createdAt: String? = null
)

data class LoginRequest(
    val username: String,
    val password: String
)

data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String
)
