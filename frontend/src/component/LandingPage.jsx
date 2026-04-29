import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";


// const projects = [
//   {
//     title: "AI Resume Builder",
//     description:
//       "Generate professional resumes using AI with downloadable PDF feature.",
//     tech: "React, Python, OpenAI API, Flask",
//     price: "5999",
//     image:
//       "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
//     link: "https://demo-resume-ai.com",
//   },
//   {
//     title: "Portfolio Generator",
//     description:
//       "Create stunning developer portfolios instantly using AI templates.",
//     tech: "React, Node.js, AI",
//     price: "3999",
//     image:
//       "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
//     link: "https://demo-portfolio-ai.com",
//   },
//   {
//     title: "Cover Letter AI",
//     description:
//       "Generate job-ready cover letters tailored to your resume.",
//     tech: "React, OpenAI API",
//     price: "1999",
//     image:
//       "https://images.unsplash.com/photo-1455390582262-044cdead277a",
//     link: "https://demo-cover-ai.com",
//   },
//   {
//     title: "Freelancer Branding Kit",
//     description:
//       "Complete branding kit for freelancers including bio, resume & site.",
//     tech: "React, Flask, AI",
//     price: "7999",
//     image:
//       "https://images.unsplash.com/photo-1556761175-4b46a572b786",
//     link: "https://demo-branding-kit.com",
//   },
// ];

const LandingPage = () => {

   const [projects, setProjects] = useState([]);
     const navigate = useNavigate();

  // ===============================
  // CHECK LOGIN FUNCTION
  // ===============================
  const handleProtectedRoute = () => {
    const token = localStorage.getItem("access"); // JWT token

    if (token) {
      navigate("/dashboard"); // login hai to dashboard
    } else {
   alert("Please login first");
   navigate("/login");// login nahi hai to login page
    }
  };

  // FETCH ADMIN ADDED PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/projects/");
      const data = await res.json();

      // only first 2 cards show on landing page
      setProjects(data.slice(0, 2));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <div className="min-h-screen bg-[#0b0f19] text-white overflow-hidden">
      {/* NAVBAR */}
{/* NAVBAR */}
<header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
  <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

    {/* LOGO */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
        <Sparkles size={18} />
      </div>

      <div>
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          SheCraft-AI
        </h1>
        <p className="text-[10px] text-gray-400 -mt-1">
          Build Your Brand
        </p>
      </div>
    </div>

    {/* NAV LINKS */}
    <nav className="hidden md:flex gap-8 text-sm text-gray-300">
      <a href="#features" className="hover:text-white transition">
        Features
      </a>
      <a href="#projects" className="hover:text-white transition">
        Projects
      </a>
      <a href="#how" className="hover:text-white transition">
        How it works
      </a>
      <a href="#contact" className="hover:text-white transition">
        Contact
      </a>
    </nav>

    {/* CTA */}
    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium hover:scale-105 transition shadow-lg">
      Get Started
    </button>

  </div>
</header>

      {/* HERO */}
{/* HERO */}
<section className="relative pt-40 px-6 text-center max-w-5xl mx-auto">

  {/* Background Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/30 blur-[120px] rounded-full"></div>
  <div className="absolute top-20 right-10 w-[250px] h-[250px] bg-pink-500/20 blur-[100px] rounded-full"></div>

  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-6xl font-extrabold leading-tight"
  >
    Build Your{" "}
    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-transparent bg-clip-text">
      Personal Brand
    </span>{" "}
    with AI
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mt-6 text-gray-400 text-sm md:text-lg max-w-2xl mx-auto"
  >
    Create resumes, portfolios, cover letters & branding kits in seconds using AI-powered automation designed for freelancers & developers.
  </motion.p>

  {/* Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
  >
    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-medium shadow-lg hover:scale-105 transition">
      Get Started Free
    </button>

    <button className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition">
      Watch Demo
    </button>
  </motion.div>

  {/* Stats */}
  <div className="mt-12 grid grid-cols-3 gap-6 text-center text-sm text-gray-400">
    <div>
      <p className="text-white text-xl font-bold">10K+</p>
      Users
    </div>
    <div>
      <p className="text-white text-xl font-bold">50+</p>
      AI Tools
    </div>
    <div>
      <p className="text-white text-xl font-bold">4.9★</p>
      Rating
    </div>
  </div>

</section>

           {/* PROJECT SECTION */}
      <section id="projects" className="mt-24 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h3>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
            >
              {/* IMAGE */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
              )}

              {/* CONTENT */}
              <div className="p-6">
                <h4 className="text-2xl font-bold">{item.title}</h4>

                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* TECH STACK */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tech?.split(",").map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* PRICE + BTN */}
                <div className="mt-5 flex justify-between items-center">
                  <span className="text-green-400 font-bold text-xl">
                    ₹{item.price}
                  </span>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm"
                  >
                    View Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



{/* FEATURES */}
      <section id="features" className="mt-28 px-6 max-w-6xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-purple-500/20 blur-[120px] rounded-full"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-center mb-4">
            Powerful Features
          </h3>

          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14 text-sm md:text-base">
            Everything you need to build your personal brand.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "AI Resume Builder",
                desc: "Create ATS-friendly resumes in minutes.",
                icon: "📄"
              },
              {
                title: "Portfolio Generator",
                desc: "Launch stunning portfolio websites instantly.",
                icon: "💻"
              },
              {
                title: "Smart Suggestions",
                desc: "Get personalized branding recommendations.",
                icon: "✨"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                onClick={handleProtectedRoute}
                className="group relative p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden cursor-pointer"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg mb-5">
                  {item.icon}
                </div>

                {/* Title */}
                <h4 className="relative z-10 text-xl font-semibold mb-3 group-hover:text-pink-400 transition">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="relative z-10 text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom Line */}
                <div className="relative z-10 mt-6 w-12 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

    
{/* HOW IT WORKS */}
<section id="how" className="mt-28 px-6 max-w-6xl mx-auto relative">

  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-pink-500/20 blur-[120px] rounded-full"></div>

  <h3 className="text-3xl font-bold text-center mb-14">
    How it works
  </h3>

  <div className="grid md:grid-cols-3 gap-8">

    {[
      {
        title: "Enter Data",
        desc: "Add your details like resume, skills or project info.",
        icon: "📝"
      },
      {
        title: "AI Processes",
        desc: "Our AI analyzes and builds optimized content instantly.",
        icon: "⚙️"
      },
      {
        title: "Get Output",
        desc: "Download or share your professional output instantly.",
        icon: "🚀"
      }
    ].map((step, i) => (
      <div
        key={i}
        className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition group"
      >

        <div className="flex items-start gap-5">

          {/* BIGGER NUMBER BOX */}
          <div className="shrink-0 mt-1">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <div className="text-4xl mb-3">{step.icon}</div>

            <h4 className="text-xl font-semibold mb-2 group-hover:text-pink-400 transition">
              {step.title}
            </h4>

            <p className="text-gray-400 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>

        </div>

      </div>
    ))}
  </div>
</section>


      {/* FOOTER */}
 {/* FOOTER */}
<footer id="contact" className="relative mt-32 border-t border-white/10 bg-[#0b0f19]">

  {/* Glow Background */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full"></div>

  <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 relative z-10">

    {/* Brand */}
    <div>
      <h2 className="text-xl font-bold">SheCraft-AI</h2>
      <p className="text-gray-400 text-sm mt-3">
        Build your personal brand with AI-powered tools for freelancers, developers & creators.
      </p>
    </div>

    {/* Links */}
    <div>
      <h3 className="font-semibold mb-4">Product</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li><a href="#features" className="hover:text-white">Features</a></li>
        <li><a href="#projects" className="hover:text-white">Projects</a></li>
        <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-4">Company</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li><a href="#" className="hover:text-white">About</a></li>
        <li><a href="#" className="hover:text-white">Careers</a></li>
        <li><a href="#" className="hover:text-white">Blog</a></li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold mb-4">Contact</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li>Email: support@shecraftai.com</li>
        <li>Phone: +91 9999999999</li>
        <li>India</li>
      </ul>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
    © 2026 SheCraft-AI. All rights reserved.
  </div>

</footer>
    </div>
  );
};

export default LandingPage;



