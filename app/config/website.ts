interface Socia {
  href: string
  icon: string
}

interface WebsiteConfig {
  darkLogoImage: string
  logo: string
  logoImage: string
  socia: Socia[]
  title: string
  userImage: string
  username: string
}

export const websiteConfig: WebsiteConfig = Object.freeze({
  darkLogoImage: 'logoImg_dark.svg',
  logo: '/logo.svg',
  logoImage: '/logoImg.svg',
  socia: [
    {
      href: 'https://github.com/CofCat456',
      icon: 'github',
    },
    {
      href: 'mailto:a25690756@gmail.com',
      icon: 'mail',
    },
    {
      href: 'https://www.cofcat.com/',
      icon: 'public',
    },
  ],
  title: 'Travel Fun',
  userImage: '/user.jpg',
  username: 'CofCat',
})
