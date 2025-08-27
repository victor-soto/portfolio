import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Calendar, Heart, ArrowUp } from "lucide-react"
import { siteConfig } from "@/config/site.config"
import about from "@/data/about.json"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.pushState(null, '', window.location.pathname)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/50">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-2 transform">
                  <Mail className="w-5 h-5" />
                  <a 
                    href={`mailto:${siteConfig.links.email}`}
                    className="hover:underline"
                  >
                    {siteConfig.links.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-2 transform">
                  <MapPin className="w-5 h-5" />
                  <span>{about.location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-2 transform">
                  <Calendar className="w-5 h-5" />
                  <span>{about.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30 px-8 lg:px-12">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {currentYear} {siteConfig.name}. Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and Next.js</span>
          </div>
          
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 transform"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  )
}
