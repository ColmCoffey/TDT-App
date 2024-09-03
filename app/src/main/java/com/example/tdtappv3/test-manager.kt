package com.example.tdtapp.domain

import com.example.tdtapp.data.TestRepository
import com.example.tdtapp.data.TestResult
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject
import javax.inject.Singleton
import kotlin.math.min

@Singleton
class TestManager @Inject constructor(private val repository: TestRepository) {
    var totalRounds: Int = 0
    var currentRound: Int = 0
    var testMode: TestMode = TestMode.STAIRCASE
    var stimulusType: StimulusType = StimulusType.VISUAL
    var refreshRate: Float = 60f
    var isRandomCatch: Boolean = false
    var selectedCatchTrial: Int = 0
    var isVoiceCommandEnabled: Boolean = false

    var interStimulusInterval: Float = 0f
    var stimuliCount: Int = 0
    var asyncResponseCount: Int = 0
    var catchTrialHold: Boolean = false

    private val tdtValues = mutableListOf<Float>()
    private val frameTime: Float
        get() = 1000f / refreshRate

    fun initializeTest() {
        currentRound = 0
        tdtValues.clear()
        interStimulusInterval = frameTime
        stimuliCount = 0
        asyncResponseCount = 0
        catchTrialHold = false
    }

    suspend fun saveTestResult(interval: Float, response: String, isCatchTrial: Boolean) {
        val result = TestResult(
            round = currentRound,
            interval = interval,
            response = response,
            isCatchTrial = isCatchTrial
        )
        withContext(Dispatchers.IO) {
            repository.saveTestResult(result)
        }
    }

    fun calculateTDT() {
        val tdt = when (testMode) {
            TestMode.STAIRCASE -> interStimulusInterval - 3 * frameTime
            TestMode.RANDOM -> tdtValues.minOrNull() ?: 0f
            TestMode.CONVERGE -> calculateConvergeTDT()
        }
        tdtValues.add(tdt)
    }

    private fun calculateConvergeTDT(): Float {
        // Implement converge mode TDT calculation
        // This is a placeholder implementation
        return tdtValues.average().toFloat()
    }

    fun getOverallTDT(): Float {
        val validTDTs = tdtValues.filter { it > 0 }
        return if (validTDTs.isNotEmpty()) validTDTs.average().toFloat() else 0f
    }

    fun prepareNextTrial() {
        when (testMode) {
            TestMode.STAIRCASE -> interStimulusInterval += frameTime
            TestMode.RANDOM -> interStimulusInterval = generateRandomDelay()
            TestMode.CONVERGE -> interStimulusInterval = calculateConvergeDelay()
        }
        stimuliCount++
    }

    private fun generateRandomDelay(): Float {
        return (1..20).random() * frameTime
    }

    private fun calculateConvergeDelay(): Float {
        // Implement converge mode delay calculation
        // This is a placeholder implementation
        return min(interStimulusInterval + frameTime, 100f)
    }

    fun isCatchTrial(): Boolean {
        return if (isRandomCatch) {
            stimuliCount == (1..5).random()
        } else {
            stimuliCount == selectedCatchTrial
        }
    }

    fun isTestComplete(): Boolean {
        return currentRound >= totalRounds
    }

    fun moveToNextRound() {
        currentRound++
        interStimulusInterval = frameTime
        stimuliCount = 0
        asyncResponseCount = 0
        catchTrialHold = false
    }
}
