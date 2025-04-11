import {useState} from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Testimonials from "../components/Testimonials/Testimonials";
import Features from "../components/Features/Features";
import JoinProgram from "../components/JoinProgram/JoinProgram";
import Footer from "../components/Footer/Footer";
import GlobalStyle from "../styles/global";
function Home() {
    return(
        <div className="home">
            <GlobalStyle/>
            <Navbar/>
            <Hero/>
            <Services/>
            <Features/>
            <Testimonials/>
            
            <JoinProgram/>
            <Footer/>
        </div>
    );
}

export default Home;