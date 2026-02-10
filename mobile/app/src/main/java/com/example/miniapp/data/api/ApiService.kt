package com.example.miniapp.data.api

import com.example.miniapp.data.model.LoginRequest
import com.example.miniapp.data.model.RegisterRequest
import com.example.miniapp.data.model.User
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @GET("api/users")
    suspend fun getUsers(): Response<List<User>>

    @GET("api/users/{id}")
    suspend fun getUser(@Path("id") id: Long): Response<User>

    @POST("api/users")
    suspend fun register(@Body request: RegisterRequest): Response<User>

    @DELETE("api/users/{id}")
    suspend fun deleteUser(@Path("id") id: Long): Response<Unit>
}
