import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-32 px-6">
        <div className="container mx-auto max-w-2xl">
            <div className="text-center space-y-6 mb-12">
                <h1 className="text-4xl font-serif text-primary">Get in Touch</h1>
                <p className="text-lg opacity-80">
                    Whether you are drawn to a specific painting, interested in a commission, or simply wish to connect.
                    One message can open a door.
                </p>
            </div>

            <form className="space-y-6 bg-card p-8 rounded-xl shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="subject">Interest</Label>
                    <Input id="subject" placeholder="Inquiry about 'Lightscapes'" />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Share your thoughts..." className="min-h-[150px]" />
                </div>

                <Button className="w-full uppercase tracking-widest text-lg py-6">Send Message</Button>
            </form>
            
            <div className="mt-12 text-center space-y-2 text-muted-foreground">
                <p>Or email directly:</p>
                <a href="mailto:contact@monicaesguevaart.com" className="text-primary hover:underline">contact@monicaesguevaart.com</a>
            </div>
        </div>
    </div>
  )
}
