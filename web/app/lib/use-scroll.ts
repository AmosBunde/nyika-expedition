import * as React from "react"

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

/**
 * Adds `.is-visible` to `.reveal` elements as they enter the viewport.
 * Pass a `key` (e.g. the pathname) to re-scan after client-side navigation.
 */
export function useReveal(key?: unknown) {
  React.useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible")
    // Without IntersectionObserver, reveal everything immediately so content is
    // never left stuck at opacity:0.
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach(reveal)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    )
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
