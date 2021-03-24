import React from 'react'
import StepArrow from './StepArrow'
import StepBar from './StepBar'
import StepCard from './StepCard'

function Steps({ currentStep, setCurrentStep, stepsCompleted }) {
    return (
        <div className="w-full py-6 bg-white rounded-md my-1 shadow">
            <div className="flex">
                <div className="w-1/3" onClick={() => setCurrentStep(1)}>
                    <StepCard title="Personal Info" completed={stepsCompleted.includes(1)}>
                        <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </StepCard>
                </div>
                <div className="w-1/3" onClick={() => setCurrentStep(2)}>
                    <div className="relative mb-2 h-24">
                        <StepBar fill={stepsCompleted.includes(1)} />
                        <StepCard title="Pago" completed={stepsCompleted.includes(2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </StepCard>
                    </div>
                </div>
                <div className="w-1/3" onClick={() => setCurrentStep(3)}>
                    <div className="relative mb-2 h-24">
                        <StepBar fill={stepsCompleted.includes(2)} />
                        <StepCard title="Finalizar" completed={stepsCompleted.includes(3)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </StepCard>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Steps
