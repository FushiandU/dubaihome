import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Home, 
  BarChart3,
  MapPin,
  Star,
  Users,
  ArrowRight,
  Play,
  Sparkles,
  Globe,
  PiggyBank,
  FileText,
  HeadphonesIcon,
  MessageCircle
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const ModernLandingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const benefits = [
    {
      icon: Home,
      title: "Remote Property Purchase",
      description: "Buy Dubai property from the UK without visiting. Complete process handled digitally."
    },
    {
      icon: TrendingUp,
      title: "8-9% Annual Returns",
      description: "Achieve superior rental yields compared to typical UK property investments."
    },
    {
      icon: Shield,
      title: "Tax-Free Investment",
      description: "0% capital gains tax and rental income tax in Dubai. Maximize your returns."
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Exclusive insights into Dubai's highest-performing investment areas."
    },
    {
      icon: PiggyBank,
      title: "Flexible Financing",
      description: "Developer payment plans and international mortgage options available."
    },
    {
      icon: Globe,
      title: "Full Foreign Ownership",
      description: "100% freehold ownership rights for international investors."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Manchester, UK",
      avatar: "SM",
      text: "The guide helped me secure a £180k apartment in Dubai Marina. Already seeing 8.7% returns!",
      property: "1BR Dubai Marina",
      roi: "8.7%"
    },
    {
      name: "James Wilson",
      location: "London, UK", 
      avatar: "JW",
      text: "Incredibly detailed process. Bought my first Dubai property remotely with complete confidence.",
      property: "Studio Business Bay",
      roi: "9.1%"
    },
    {
      name: "Emma Thompson",
      location: "Birmingham, UK",
      avatar: "ET",
      text: "Best investment decision I've made. The tax benefits alone save me £12k annually.",
      property: "2BR Downtown",
      roi: "8.4%"
    }
  ];

  const stats = [
    { number: "500+", label: "UK Investors" },
    { number: "£75M+", label: "Properties Sold" },
    { number: "8.2%", label: "Average ROI" },
    { number: "15%", label: "Annual Growth" }
  ];

  const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 1, 0]
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Dubai Property Pro
              </span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50/50">
                <Sparkles className="w-3 h-3 mr-1" />
                Limited Time
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-200 hover:border-gray-300 backdrop-blur-sm"
              >
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                +971 50 123 4567
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                    <Download className="w-4 h-4 mr-2" />
                    Free Guide • Usually £50
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    UK Buyer's Guide to{' '}
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Dubai Property 2025
                  </span>
                </motion.h1>

                <motion.p 
                  className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Discover how UK investors are earning{' '}
                  <span className="font-semibold text-blue-600">8% tax-free returns</span>{' '}
                  with Dubai property investment
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/40">
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div 
                className="flex items-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {['JD', 'SM', 'RT', 'AL'].map((initials, i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-semibold border-2 border-white">
                        {initials}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">500+ UK investors</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.9/5 rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Glass Morphism Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <FloatingElement>
                <Card className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    {!isSubmitted ? (
                      <>
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Download Free Guide
                          </h3>
                          <p className="text-gray-600">
                            Get instant access to our comprehensive Dubai property investment guide
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                                Full Name
                              </Label>
                              <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                                Email Address
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+44 7XXX XXXXXX"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                                required
                              />
                            </div>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              type="submit" 
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl h-12 text-lg shadow-lg shadow-blue-500/25"
                            >
                              <Download className="w-5 h-5 mr-2" />
                              Download Guide Now
                            </Button>
                          </motion.div>

                          <div className="text-center">
                            <p className="text-xs text-gray-500">
                              ✓ Instant download • ✓ No spam • ✓ Expert consultation included
                            </p>
                          </div>
                        </form>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <CheckCircle className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                        <p className="text-gray-600 mb-4">
                          Check your email for the guide and exclusive consultation offer.
                        </p>
                        
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <p className="text-sm text-green-700">
                            📧 Guide sent to: <strong>{formData.email}</strong><br/>
                            📞 Expert consultation within 24 hours
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </FloatingElement>

              {/* Floating Elements */}
              <FloatingElement delay={1}>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-20 blur-xl" />
              </FloatingElement>
              <FloatingElement delay={2}>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl opacity-20 blur-xl" />
              </FloatingElement>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <AnimatedSection className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Why UK Investors Choose Dubai
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover the unique advantages that make Dubai property investment the smart choice for UK investors
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/60 backdrop-blur-sm border border-white/40 hover:border-blue-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Social Proof Section */}
      <AnimatedSection className="py-20 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Success Stories from UK Investors
              </span>
            </motion.h2>
            <motion.div 
              className="flex justify-center items-center space-x-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-semibold text-gray-700 ml-2">4.9/5 from 247 reviews</span>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {testimonial.location}
                        </p>
                      </div>
                      <Badge className="ml-auto bg-green-100 text-green-700 border-green-200">
                        {testimonial.roi} ROI
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-blue-600">{testimonial.property}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
            </div>

            <div className="relative">
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Start Your Dubai Investment Journey?
              </motion.h2>
              
              <motion.p 
                className="text-xl mb-8 opacity-90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join 500+ UK investors who've already downloaded our comprehensive guide
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl text-lg shadow-lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Get Free Guide Now
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Chat
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="mt-8 flex justify-center space-x-8 text-sm opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Instant Download
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  No Spam Promise
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Expert Support
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white/50 backdrop-blur-sm border-t border-white/40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Dubai Property Pro
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Your trusted partner for Dubai real estate investment from the UK.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-1" />
                  RERA Licensed
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  500+ Clients
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <HeadphonesIcon className="w-4 h-4 mr-2" />
                  +971 50 123 4567
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </div>
                <div>📧 hello@dubaipropertypro.com</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
              <div className="space-y-2 text-gray-600">
                <div>📊 Investment Analysis</div>
                <div>🏠 Property Search</div>
                <div>💰 Financing Guidance</div>
                <div>⚖️ Legal Support</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Dubai Property Pro. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            size="lg" 
            className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white w-14 h-14 shadow-2xl shadow-green-500/25"
            onClick={() => window.open('https://wa.me/971501234567', '_blank')}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernLandingPage;