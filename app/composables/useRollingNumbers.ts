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

    const doAnimation = () => {
      if (!animated && elements.length > 0) {
        animated = true
        elements.forEach((el, index) => {
          if (endValues[index] !== undefined) {
            animate(el, endValues[index], duration)
          }
        })
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          doAnimation()
          observer.disconnect()
        }
      })
    }, { threshold: 0.1 })

    // Check if element exists and set up observer
    if (elements.length > 0) {
      const targetElement = elements[0].parentElement?.parentElement || elements[0].parentElement || elements[0]
      observer.observe(targetElement)

      // Also check if element is already visible on page load
      const rect = targetElement.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        doAnimation()
      }
    }
  }

  return {
    animate,
    animateOnIntersection
  }
}
