export function scrollTo(id: string) {
  const element = document.getElementById(id)

  if (element) {
    const elementHeight = element.offsetHeight
    const windowHeight = window.innerHeight
    const top = element.offsetTop - (windowHeight - elementHeight) / 2

    window.scrollTo({ top, behavior: 'smooth' })
  }
}
