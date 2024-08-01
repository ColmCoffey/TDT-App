package com.example.tdtapp.presentation

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.tdtapp.databinding.ActivityTestBinding
import com.example.tdtapp.domain.TestManager
import com.example.tdtapp.domain.StimulusPresenter
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject
import kotlinx.coroutines.*

@AndroidEntryPoint
class TestActivity : AppCompatActivity() {

    private lateinit var binding: ActivityTestBinding
    
    @Inject lateinit var testManager: TestManager
    @Inject lateinit var stimulusPresenter: StimulusPresenter

    private val coroutineScope = CoroutineScope(Dispatchers.Main + Job())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityTestBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
        updateRoundDisplay()
    }

    private fun setupListeners() {
        binding.btnStartStimulus.setOnClickListener { presentStimulus() }
        binding.btnSame.setOnClickListener { processResponse(false) }
        binding.btnDifferent.setOnClickListener { processResponse(true) }
    }

    private fun presentStimulus() {
        binding.btnStartStimulus.isEnabled = false
        binding.vStimulus.visibility = View.VISIBLE

        coroutineScope.launch {
            stimulusPresenter.presentStimulus(testManager.stimulusType, testManager.interStimulusInterval)
            delay(testManager.interStimulusInterval.toLong())
            binding.vStimulus.visibility = View.INVISIBLE
            binding.btnSame.isEnabled = true
            binding.btnDifferent.isEnabled = true
        }
    }

    private fun processResponse(isAsync: Boolean) {
        testManager.processResponse(isAsync)
        updateRoundDisplay()

        if (testManager.isTestComplete()) {
            finish()
        } else {
            resetForNextTrial()
        }
    }

    private fun updateRoundDisplay() {
        binding.tvRound.text = "Round: ${testManager.currentRound}"
    }

    private fun resetForNextTrial() {
        binding.btnStartStimulus.isEnabled = true
        binding.btnSame.isEnabled = false
        binding.btnDifferent.isEnabled = false
    }

    override fun onDestroy() {
        coroutineScope.cancel()
        super.onDestroy()
    }
}
