"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Mail, MapPin, Calendar, Menu, X } from "lucide-react"
import experience from "@/data/experience.json"
import projects from "@/data/projects.json"
import about from "@/data/about.json"
import { siteConfig } from "@/config/site.config"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number
    left: number
    top: number
    delay: number
    duration: number
  }>>([])
  
  // Track when component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
    
    // Generate stable random values for animations only on client
    setFloatingElements(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 20
      }))
    )

    // Handle direct hash navigation on page load
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1) // Remove the # symbol
      if (hash && ['about', 'experience', 'projects', 'contact'].includes(hash)) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setActiveSection(hash)
          }
        }, 100)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "contact"]
      const scrollPosition = window.scrollY + 100
      setScrollY(window.scrollY)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".fade-in-element")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [mounted])

  const scrollToSection = (sectionId: string) => {
    if (!mounted) return
    const element = document.getElementById(sectionId)
    if (element) {
      // Update URL hash
      window.history.pushState(null, '', `#${sectionId}`)
      // Smooth scroll to element
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 animate-pulse-slow pointer-events-none" />

      {mounted && (
        <div className="fixed inset-0 pointer-events-none">
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
              }}
            />
          ))}
        </div>
      )}

        {/* Primary Navigation Section */}
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-8 hidden md:flex">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium transition-all duration-500 hover:text-primary text-right hover:scale-110 transform ${
                activeSection === "about"
                  ? "text-primary border-r-2 border-primary pr-4 shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:border-r-2 hover:border-primary/50 hover:pr-4"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className={`text-sm font-medium transition-all duration-500 hover:text-primary text-right hover:scale-110 transform ${
                activeSection === "experience"
                  ? "text-primary border-r-2 border-primary pr-4 shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:border-r-2 hover:border-primary/50 hover:pr-4"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`text-sm font-medium transition-all duration-500 hover:text-primary text-right hover:scale-110 transform ${
                activeSection === "projects"
                  ? "text-primary border-r-2 border-primary pr-4 shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:border-r-2 hover:border-primary/50 hover:pr-4"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium transition-all duration-500 hover:text-primary text-right hover:scale-110 transform ${
                activeSection === "contact"
                  ? "text-primary border-r-2 border-primary pr-4 shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:border-r-2 hover:border-primary/50 hover:pr-4"
              }`}
            >
              Contact
            </button>
          </div>

        {/* Secondary Navigation Section */}
        <div className="flex flex-col space-y-3 pt-4 border-t border-border/30">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 text-sm justify-end hover:scale-110 transform hover:shadow-lg hover:shadow-primary/10"
          >
            GitHub
            <svg
              className="w-4 h-4 hover:rotate-12 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 text-sm justify-end hover:scale-110 transform hover:shadow-lg hover:shadow-primary/10"
          >
            LinkedIn
            <svg
              className="w-4 h-4 hover:rotate-12 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-all duration-300"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="flex flex-col space-y-6 text-center">
              <button
                onClick={() => {
                  scrollToSection("about")
                  setMobileMenuOpen(false)
                }}
                className={`text-2xl font-medium transition-all duration-300 hover:text-primary ${
                  activeSection === "about" ? "text-primary" : "text-foreground"
                }`}
              >
                About
              </button>
              <button
                onClick={() => {
                  scrollToSection("experience")
                  setMobileMenuOpen(false)
                }}
                className={`text-2xl font-medium transition-all duration-300 hover:text-primary ${
                  activeSection === "experience" ? "text-primary" : "text-foreground"
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => {
                  scrollToSection("projects")
                  setMobileMenuOpen(false)
                }}
                className={`text-2xl font-medium transition-all duration-300 hover:text-primary ${
                  activeSection === "projects" ? "text-primary" : "text-foreground"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => {
                  scrollToSection("contact")
                  setMobileMenuOpen(false)
                }}
                className={`text-2xl font-medium transition-all duration-300 hover:text-primary ${
                  activeSection === "contact" ? "text-primary" : "text-foreground"
                }`}
              >
                Contact
              </button>
            </div>
            
            <div className="flex flex-col space-y-4 pt-8 border-t border-border">
              <a
                href="https://github.com/johndeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-all duration-300 flex items-center gap-3 text-lg"
              >
                GitHub
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/johndeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-all duration-300 flex items-center gap-3 text-lg"
              >
                LinkedIn
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="overflow-y-hidden md:mr-32 relative z-10">
        {/* About Section */}
        <section id="about" className="p-8 lg:p-12 min-h-screen flex items-center fade-in-element">
          <div className="max-w-5xl mx-auto w-full">
            <div className="mb-12" style={{ transform: mounted ? `translateY(${scrollY * 0.1}px)` : 'none' }}>
              <h1 className="text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent animate-gradient">
                {siteConfig.name}
              </h1>
              <p className="text-sm text-muted-foreground mb-8 animate-fade-in-up">
                {siteConfig.position}
              </p>
            </div>
            <div className="grid lg:grid-cols-1 gap-16 items-center">
              <div className="space-y-6 animate-fade-in-left">
                {about.contents.map((content, i) => (
                  <p key={i} className={`text-muted-foreground mb-${i === 0 ? 6 : 8} leading-relaxed text-lg hover:text-foreground transition-colors duration-300`}>
                    {content}
                  </p>
                ))}
                <div className="flex flex-wrap gap-2 mb-8">
                  {about.tags.map(
                    (tech, index) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:scale-110 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tech}
                      </Badge>
                    ),
                  )}
                </div>
                <div className="flex flex-col gap-3 text-muted-foreground">
                  <div className="flex items-center gap-2 hover:text-primary transition-colors duration-300 hover:translate-x-2 transform">
                    <MapPin className="w-5 h-5" />
                    {about.location}
                  </div>
                  <div className="flex items-center gap-2 hover:text-primary transition-colors duration-300 hover:translate-x-2 transform">
                    <Calendar className="w-5 h-5" />
                    {about.availability}
                  </div>
                </div>
              </div>
              {/* <div className="flex justify-center animate-fade-in-right">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-70 group-hover:opacity-100" />
                  <img
                    src="/victor-soto.jpeg?height=500&width=400"
                    alt="Professional headshot"
                    className="rounded-lg shadow-2xl w-full max-w-md relative z-10 hover:scale-105 transform transition-all duration-500 hover:shadow-3xl hover:shadow-primary/20"
                  />
                </div> 
              </div> */}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="p-8 lg:p-12 min-h-screen flex items-center fade-in-element">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-5xl font-bold text-foreground mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="space-y-12">
              {experience.map((job, index) => (
                <Card
                  key={index}
                  className="bg-card/50 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:scale-105 transform group animate-fade-in-up backdrop-blur-sm"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  <CardHeader className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-foreground text-2xl group-hover:text-primary transition-colors duration-300">
                          {job.position}
                        </CardTitle>
                        <CardDescription className="text-primary text-lg font-medium mt-1">
                          {job.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-start lg:items-end gap-1">
                        <Badge variant="outline" className="text-primary border-primary/30">
                          {job.duration}
                        </Badge>
                        <p className="text-muted-foreground text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-6">
                    <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground transition-colors duration-300">
                      {job.description}
                    </p>
                    
                    <div>
                      <h4 className="text-foreground font-semibold mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:scale-110 transform transition-all duration-300"
                            style={{ animationDelay: `${techIndex * 50}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-foreground font-semibold mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 flex items-start gap-2"
                            style={{ animationDelay: `${achievementIndex * 100}ms` }}
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="p-8 lg:p-12 min-h-screen flex items-center fade-in-element">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-5xl font-bold text-foreground mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-card/50 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:scale-105 transform group animate-fade-in-up backdrop-blur-sm"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-foreground text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 transform"
                          style={{ animationDelay: `${techIndex * 50}ms` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="hover:bg-primary hover:text-primary-foreground bg-transparent hover:scale-110 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="hover:bg-primary hover:text-primary-foreground bg-transparent hover:scale-110 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <svg
                            className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="p-8 lg:p-12 min-h-screen flex items-center fade-in-element">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-5xl font-bold text-foreground mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="animate-fade-in-left">
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg hover:text-foreground transition-colors duration-300">
                  I'm always interested in hearing about new opportunities and exciting projects. Whether you have a
                  question or just want to say hello, feel free to reach out!
                </p>
                <div className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-primary transition-all duration-300 hover:translate-x-2 transform">
                  <Mail className="w-5 h-5" />
                  {siteConfig.links.email}
                </div>
              </div>
              <div className="animate-fade-in-right">
                <Card className="bg-card/50 border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 backdrop-blur-sm group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-foreground">Send me a message</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      I'd love to hear about your project or just say hello!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-input border-border text-foreground hover:border-primary/50 focus:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-input border-border text-foreground hover:border-primary/50 focus:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={5}
                          className="bg-input border-border text-foreground hover:border-primary/50 focus:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .fade-in-element {
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>
    </div>
  )
}
