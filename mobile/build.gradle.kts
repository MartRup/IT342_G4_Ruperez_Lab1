// Top-level build file
buildscript {
    extra.apply {
        set("compose_version", "1.5.1")
    }
}

plugins {
    id("com.android.application") version "8.1.4" apply false
    id("org.jetbrains.kotlin.android") version "1.9.10" apply false
}
