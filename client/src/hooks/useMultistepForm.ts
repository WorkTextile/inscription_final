import { ReactElement, useState } from "react"

export function useMultistepForm(pageNumberSteps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  function next() {
    setCurrentStepIndex(i => {
      if (i >= pageNumberSteps.length - 1) return i //** If the page is at last step don't increment */
      return i + 1 //** Otherwise increment the page
    })
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i //** If the page is at currentIndex don't substract */
      return i - 1 //** Otherwise substract  */
    })
  }

  function goTo(index: number) {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    currentStepPage: pageNumberSteps[currentStepIndex],
    pageNumberSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === pageNumberSteps.length - 1,
    goTo,
    next,
    back,
  }
  
}
