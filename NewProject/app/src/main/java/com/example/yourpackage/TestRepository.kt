package com.example.tdtapp.data

import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TestRepository @Inject constructor() {
    private val testResults = mutableListOf<TestResult>()

    fun saveTestResult(result: TestResult) {
        testResults.add(result)
    }

    fun getAllTestResults(): List<TestResult> = testResults

    fun clearAllTestResults() {
        testResults.clear()
    }
}

data class TestResult(
    val round: Int,
    val interval: Float,
    val response: String,
    val isCatchTrial: Boolean
)
