package com.example.tdtapp.domain

import javax.inject.Inject

class StimulusPresenter @Inject constructor() {
    fun presentStimulus(type: StimulusType, duration: Float) {
        // In a real implementation, this would control the actual stimulus presentation
        println("Presenting $type stimulus for $duration ms")
    }
}
