import { ref, onMounted } from 'vue'
import gsap from 'gsap'

export const useRollingNumbers = () => {
  const animate = (element: HTMLElement, endValue: number, duration: number = 3) => {
    const obj = { value: 0 }

    gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.floor(obj.value).toString()
      }
    })
  }

  const animateOnIntersection = (selector: string, endValues: number[], duration: number = 3) => {
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>
    let animated = false

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          elements.forEach((el, index) => {
            if (endValues[index]) {
              animate(el, endValues[index], duration)
            }
          })
          observer.disconnect()
        }
      })
    }, { threshold: 0.5 })

    // Observe the first element
    if (elements[0]) {
      observer.observe(elements[0].parentElement || elements[0])
    }
  }

  return {
    animate,
    animateOnIntersection
  }
}
