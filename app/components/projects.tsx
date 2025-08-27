import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default function ProjectsSection(props: { projects: { title: string, description: string, technologies: string[], demoUrl: string, githubUrl: string }[] }) {
  return (
        <section id="projects" className="p-8 lg:p-12 min-h-screen flex items-center fade-in-element">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-5xl font-bold text-foreground mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {props.projects.map((project, index) => (
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
  );
}