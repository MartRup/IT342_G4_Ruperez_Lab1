package com.example.miniapp.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.miniapp.data.api.RetrofitInstance
import com.example.miniapp.data.model.RegisterRequest
import com.example.miniapp.data.model.User
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class UiState {
    object Idle : UiState()
    object Loading : UiState()
    data class Success(val user: User) : UiState()
    data class Error(val message: String) : UiState()
}

class UserViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<UiState>(UiState.Idle)
    val uiState: StateFlow<UiState> = _uiState

    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users

    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser

    fun register(username: String, email: String, password: String) {
        viewModelScope.launch {
            _uiState.value = UiState.Loading
            try {
                val request = RegisterRequest(username, email, password)
                val response = RetrofitInstance.api.register(request)
                if (response.isSuccessful && response.body() != null) {
                    _currentUser.value = response.body()
                    _uiState.value = UiState.Success(response.body()!!)
                } else {
                    _uiState.value = UiState.Error("Registration failed: ${response.message()}")
                }
            } catch (e: Exception) {
                _uiState.value = UiState.Error("Error: ${e.message}")
            }
        }
    }

    fun login(username: String) {
        viewModelScope.launch {
            _uiState.value = UiState.Loading
            try {
                val response = RetrofitInstance.api.getUsers()
                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!.find { it.username == username }
                    if (user != null) {
                        _currentUser.value = user
                        _uiState.value = UiState.Success(user)
                    } else {
                        _uiState.value = UiState.Error("User not found")
                    }
                } else {
                    _uiState.value = UiState.Error("Login failed")
                }
            } catch (e: Exception) {
                _uiState.value = UiState.Error("Error: ${e.message}")
            }
        }
    }

    fun loadUsers() {
        viewModelScope.launch {
            try {
                val response = RetrofitInstance.api.getUsers()
                if (response.isSuccessful && response.body() != null) {
                    _users.value = response.body()!!
                }
            } catch (e: Exception) {
                _uiState.value = UiState.Error("Error loading users: ${e.message}")
            }
        }
    }

    fun logout() {
        _currentUser.value = null
        _uiState.value = UiState.Idle
    }

    fun resetState() {
        _uiState.value = UiState.Idle
    }
}
