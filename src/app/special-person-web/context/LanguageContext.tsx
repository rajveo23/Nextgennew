'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  getFullPageContent: () => string
}

const translations = {
  en: {
    // Header
    pageTitle: 'NextGen RTA - Accessible Portal',
    pageSubtitle: 'SEBI Registered Registrar & Share Transfer Agent',
    complianceNote: 'WCAG 2.1 AA & GIGW 3.0 Compliant',
    
    // Navigation
    navHome: 'Home',
    navServices: 'Services',
    navWhyChooseUs: 'Why Choose Us',
    navTeam: 'Team',
    navTestimonials: 'Testimonials',
    navContact: 'Contact',
    navAccessibility: 'Accessibility',
    
    // Hero Section
    heroHeading: 'NextGen RTA - SEBI Registered',
    heroDescription: 'Registrar & Share Transfer Agent specializing in ISIN generation, demat services, and e-voting events with unmatched speed and accuracy',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    yearsExperience: 'Years Experience',
    clientsServed: 'Clients Served',
    accuracyRate: 'Accuracy Rate',
    supportAvailable: 'Support Available',
    
    // Services Section
    servicesHeading: 'Our RTA Services',
    servicesSubheading: 'Comprehensive Registrar and Share Transfer Agent services with 27+ years of capital market experience',
    
    service1Title: 'ISIN Creation Expertise',
    service1Desc: 'Specialized in ISIN generation for equities, preference shares, debentures, and AIFs with unmatched speed and accuracy.',
    service1Point1: 'Fastest turnaround time',
    service1Point2: 'SEBI compliant process',
    service1Point3: 'Expert handling',
    
    service2Title: 'Maintenance of Demat Scrips',
    service2Desc: 'Complete maintenance of demat scrips in depository with regular updates and seamless connectivity.',
    service2Point1: 'Regular data updates',
    service2Point2: 'NSDL connectivity',
    service2Point3: 'Real-time monitoring',
    
    service3Title: 'Corporate Actions',
    service3Desc: 'Expert handling of complex corporate actions including dividend payments, bonus issues, and rights offerings.',
    service3Point1: 'Complex action handling',
    service3Point2: 'Timely execution',
    service3Point3: 'Regulatory compliance',
    
    service4Title: 'E-Voting Events',
    service4Desc: 'Seamless organization of e-voting events for issuer companies with complete technical support.',
    service4Point1: 'End-to-end support',
    service4Point2: 'Secure platform',
    service4Point3: 'Real-time reporting',
    
    // Why Choose Us
    whyHeading: 'Why Choose NextGen?',
    whySubheading: 'As your Registrar & Transfer Agent, we bring unmatched expertise and reliability',
    
    why1Title: 'Fastest Turnaround Time',
    why1Desc: 'Industry-leading speed in ISIN creation and RTA services with unmatched efficiency.',
    
    why2Title: 'SEBI Compliance',
    why2Desc: 'Fully SEBI registered and compliant with all regulatory requirements and standards.',
    
    why3Title: 'Expert Team',
    why3Desc: 'Team of MBAs, CFAs, FRMs with deep capital market expertise and experience.',
    
    why4Title: 'Data Analysis',
    why4Desc: 'Advanced data analysis capabilities for better decision making and insights.',
    
    why5Title: 'PAN India Coverage',
    why5Desc: 'Comprehensive service coverage across India with local expertise and support.',
    
    why6Title: '27+ Years Experience',
    why6Desc: 'Cumulative capital market experience bringing stability and reliability.',
    
    missionTitle: 'Our Mission',
    missionDesc: 'To revolutionize the RTA industry by making it more transparent and easier for companies to operate with a reputable and capable RTA partner.',
    
    valuesTitle: 'Our Values',
    valuesDesc: 'Transparency, reliability, and excellence in every service we provide, ensuring the highest standards of professional integrity.',
    
    visionTitle: 'Our Vision',
    visionDesc: 'To be the most renowned Registrars to an Issue and Share Transfer Agent in India, setting new benchmarks in the industry.',
    
    // Team Section
    teamHeading: 'Meet Our Leadership',
    teamSubheading: 'Experienced professionals with deep capital market expertise leading NextGen Registry',
    
    directorFounder: 'Director & Founder',
    executiveDirector: 'Executive Director',
    experience: 'Experience',
    education: 'Education',
    years: 'Years',
    keyCertifications: 'Key Certifications & Expertise',
    
    // Names
    name1: 'Mr. Shaivi Bansal',
    name2: 'Mr. Shivansh Bansal',
    
    // Form Fields
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    serviceRequired: 'Service Required',
    message: 'Message',
    selectService: 'Select a service',
    phonePlaceholder: '10-digit number',
    messagePlaceholder: 'Please describe your requirements',
    submitButton: 'Submit',
    
    // Form Validation Errors
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please enter a valid 10-digit phone number',
    serviceSelectRequired: 'Please select a service',
    messageRequired: 'Message is required',
    formErrors: 'Form has errors. Please correct them and try again.',
    formSuccess: 'Form submitted successfully! We will contact you soon.',
    formError: 'Error submitting form. Please try again.',
    submitting: 'Submitting',
    formSubmittedSuccess: 'Form submitted successfully!',
    
    // Service Options
    serviceIsin: 'ISIN Creation',
    serviceDemat: 'Demat Services',
    serviceCorporate: 'Corporate Actions',
    serviceEvoting: 'E-Voting Services',
    serviceOther: 'Other Services',
    
    // Education
    education1: 'Commerce Graduate, MBA',
    education2: 'B.COM(H), FRM, CFA Level 2',
    
    // Accessibility Statement Content
    accessibilityCommitment: 'Our Commitment to Accessibility',
    accessibilityIntro: 'NextGen Share Registry Pvt Ltd is committed to ensuring digital accessibility for people with disabilities in compliance with the Rights of Persons with Disabilities Act, 2016 (RPwD Act). We are continually improving the user experience for everyone and applying the relevant accessibility standards.',
    conformanceStatus: 'Conformance Status',
    conformanceIntro: 'This portal conforms to:',
    wcagCompliance: 'WCAG 2.1 Level AA - Web Content Accessibility Guidelines',
    gigwCompliance: 'GIGW 3.0 - Guidelines for Indian Government Websites',
    isCompliance: 'IS 17802:2020 - Indian Standard for Website Accessibility',
    rpwdCompliance: 'RPwD Act, 2016 - Rights of Persons with Disabilities Act',
    accessibilityFeaturesTitle: 'Accessibility Features',
    feature1: 'Semantic HTML structure with proper heading hierarchy',
    feature2: 'Keyboard navigation support throughout the site',
    feature3: 'Screen reader compatibility (tested with NVDA and VoiceOver)',
    feature4: 'High contrast text with minimum 4.5:1 ratio',
    feature5: 'Descriptive alt text for all images',
    feature6: 'Accessible forms with proper labels and error messages',
    
    team1Desc: 'Seasoned commerce graduate with an MBA and over 24 years of experience in capital markets. He has been a Board Director at a leading stockbroking and depository firm for over 14 years, managing compliance and the Depository Division.',
    team1Cert1: 'Multiple NISM Certifications',
    team1Cert2: 'Board Director Experience',
    team1Cert3: 'Compliance Expert',
    
    team2Desc: 'B.COM(H) commerce graduate with a focus on capital markets and finance, holding FRM certification and having cleared Level 2 of the CFA program. He has 3 years of capital markets experience and works in an executive role at a stockbroking and depository firm.',
    team2Cert1: 'FRM Certification',
    team2Cert2: 'CFA Level 2',
    team2Cert3: 'Multiple NISM Certifications',
    
    companyInfoTitle: 'About NextGen Share Registry Pvt Ltd',
    companyInfoDesc: 'With over 27 years of cumulative Capital Market Experience, NextGen RTA strives to bring a change in the RTA industry by making it more transparent and easier for companies to operate in this space by appointing a reputable and capable RTA.',
    
    // Testimonials
    testimonialsHeading: 'Client Testimonials',
    testimonialsSubheading: 'What our clients say about our services',
    
    testimonial1: 'NextGen Registry has been instrumental in managing our shareholder base efficiently. Their expertise in ISIN creation and corporate actions is unmatched.',
    testimonial1Company: 'Leading IT Company',
    testimonial1Industry: 'Information Technology',
    
    testimonial2: 'The team at NextGen provides exceptional service quality. Their turnaround time for debenture management is the fastest in the industry.',
    testimonial2Company: 'Major NBFC',
    testimonial2Industry: 'Financial Services',
    
    testimonial3: 'Professional, reliable, and transparent - NextGen Registry has exceeded our expectations in every aspect of RTA services.',
    testimonial3Company: 'Pharmaceutical Giant',
    testimonial3Industry: 'Healthcare',
    
    // Contact
    contactHeading: 'Contact Us',
    contactSubheading: 'Get in touch with our team for expert RTA services',
    
    // Accessibility
    accessibilityHeading: 'Accessibility Statement',
    accessibilitySubheading: 'Our commitment to digital accessibility for all users',
    
    // Footer
    footerContact: 'Contact Information',
    footerQuickLinks: 'Quick Links',
    footerAccessibilitySupport: 'Accessibility Support',
    footerAccessibilityText: 'For accessibility issues or feedback:',
    footerRights: 'All rights reserved',
    
    // Language & Accessibility
    languageLabel: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    readAloud: 'Read page content aloud',
    stopReading: 'Stop reading',
    switchToEnglish: 'Switch to English',
    switchToHindi: 'Switch to Hindi',
    skipToMain: 'Skip to main content',
  },
  hi: {
    // Header
    pageTitle: 'नेक्स्टजेन आरटीए - सुलभ पोर्टल',
    pageSubtitle: 'सेबी पंजीकृत रजिस्ट्रार और शेयर ट्रांसफर एजेंट',
    complianceNote: 'WCAG 2.1 AA और GIGW 3.0 अनुपालन',
    
    // Navigation
    navHome: 'होम',
    navServices: 'सेवाएं',
    navWhyChooseUs: 'हमें क्यों चुनें',
    navTeam: 'टीम',
    navTestimonials: 'प्रशंसापत्र',
    navContact: 'संपर्क करें',
    navAccessibility: 'सुलभता',
    
    // Hero Section
    heroHeading: 'नेक्स्टजेन आरटीए - सेबी पंजीकृत',
    heroDescription: 'आईसिन जनरेशन, डीमैट सेवाओं और ई-वोटिंग इवेंट्स में विशेषज्ञता रखने वाले रजिस्ट्रार और शेयर ट्रांसफर एजेंट, बेजोड़ गति और सटीकता के साथ',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    yearsExperience: 'वर्षों का अनुभव',
    clientsServed: 'ग्राहकों की सेवा की',
    accuracyRate: 'सटीकता दर',
    supportAvailable: 'सहायता उपलब्ध',
    
    // Services Section
    servicesHeading: 'हमारी आरटीए सेवाएं',
    servicesSubheading: '27+ वर्षों के पूंजी बाजार अनुभव के साथ व्यापक रजिस्ट्रार और शेयर ट्रांसफर एजेंट सेवाएं',
    
    service1Title: 'आईसिन निर्माण विशेषज्ञता',
    service1Desc: 'इक्विटी, प्रेफरेंस शेयर, डिबेंचर और एआईएफ के लिए आईसिन जनरेशन में विशेषज्ञता, बेजोड़ गति और सटीकता के साथ।',
    service1Point1: 'सबसे तेज़ टर्नअराउंड समय',
    service1Point2: 'सेबी अनुपालन प्रक्रिया',
    service1Point3: 'विशेषज्ञ हैंडलिंग',
    
    service2Title: 'डीमैट स्क्रिप्स का रखरखाव',
    service2Desc: 'नियमित अपडेट और निर्बाध कनेक्टिविटी के साथ डिपॉजिटरी में डीमैट स्क्रिप्स का पूर्ण रखरखाव।',
    service2Point1: 'नियमित डेटा अपडेट',
    service2Point2: 'एनएसडीएल कनेक्टिविटी',
    service2Point3: 'रियल-टाइम मॉनिटरिंग',
    
    service3Title: 'कॉर्पोरेट कार्रवाई',
    service3Desc: 'लाभांश भुगतान, बोनस इश्यू और राइट्स ऑफरिंग सहित जटिल कॉर्पोरेट कार्रवाइयों की विशेषज्ञ हैंडलिंग।',
    service3Point1: 'जटिल कार्रवाई हैंडलिंग',
    service3Point2: 'समय पर निष्पादन',
    service3Point3: 'नियामक अनुपालन',
    
    service4Title: 'ई-वोटिंग इवेंट्स',
    service4Desc: 'पूर्ण तकनीकी सहायता के साथ जारीकर्ता कंपनियों के लिए ई-वोटिंग इवेंट्स का निर्बाध आयोजन।',
    service4Point1: 'एंड-टू-एंड सपोर्ट',
    service4Point2: 'सुरक्षित प्लेटफॉर्म',
    service4Point3: 'रियल-टाइम रिपोर्टिंग',
    
    // Why Choose Us
    whyHeading: 'नेक्स्टजेन को क्यों चुनें?',
    whySubheading: 'आपके रजिस्ट्रार और ट्रांसफर एजेंट के रूप में, हम बेजोड़ विशेषज्ञता और विश्वसनीयता लाते हैं',
    
    why1Title: 'सबसे तेज़ टर्नअराउंड समय',
    why1Desc: 'बेजोड़ दक्षता के साथ आईसिन निर्माण और आरटीए सेवाओं में उद्योग-अग्रणी गति।',
    
    why2Title: 'सेबी अनुपालन',
    why2Desc: 'पूर्णतः सेबी पंजीकृत और सभी नियामक आवश्यकताओं और मानकों के अनुरूप।',
    
    why3Title: 'विशेषज्ञ टीम',
    why3Desc: 'गहन पूंजी बाजार विशेषज्ञता और अनुभव वाले एमबीए, सीएफए, एफआरएम की टीम।',
    
    why4Title: 'डेटा विश्लेषण',
    why4Desc: 'बेहतर निर्णय लेने और अंतर्दृष्टि के लिए उन्नत डेटा विश्लेषण क्षमताएं।',
    
    why5Title: 'पैन इंडिया कवरेज',
    why5Desc: 'स्थानीय विशेषज्ञता और सहायता के साथ भारत भर में व्यापक सेवा कवरेज।',
    
    why6Title: '27+ वर्षों का अनुभव',
    why6Desc: 'स्थिरता और विश्वसनीयता लाने वाला संचयी पूंजी बाजार अनुभव।',
    
    missionTitle: 'हमारा मिशन',
    missionDesc: 'आरटीए उद्योग में क्रांति लाना और कंपनियों के लिए एक प्रतिष्ठित और सक्षम आरटीए साझेदार के साथ काम करना आसान और अधिक पारदर्शी बनाना।',
    
    valuesTitle: 'हमारे मूल्य',
    valuesDesc: 'हमारी प्रदान की जाने वाली हर सेवा में पारदर्शिता, विश्वसनीयता और उत्कृष्टता, पेशेवर अखंडता के उच्चतम मानकों को सुनिश्चित करना।',
    
    visionTitle: 'हमारी दृष्टि',
    visionDesc: 'भारत में सबसे प्रसिद्ध रजिस्ट्रार टू एन इश्यू और शेयर ट्रांसफर एजेंट बनना, उद्योग में नए मानक स्थापित करना।',
    
    // Team Section
    teamHeading: 'हमारे नेतृत्व से मिलें',
    teamSubheading: 'नेक्स्टजेन रजिस्ट्री का नेतृत्व करने वाले गहन पूंजी बाजार विशेषज्ञता वाले अनुभवी पेशेवर',
    
    directorFounder: 'निदेशक और संस्थापक',
    executiveDirector: 'कार्यकारी निदेशक',
    experience: 'अनुभव',
    education: 'शिक्षा',
    years: 'वर्ष',
    keyCertifications: 'प्रमुख प्रमाणपत्र और विशेषज्ञता',
    
    // Names
    name1: 'श्री शैवी बंसल',
    name2: 'श्री शिवांश बंसल',
    
    // Form Fields
    fullName: 'पूरा नाम',
    emailAddress: 'ईमेल पता',
    phoneNumber: 'फ़ोन नंबर',
    serviceRequired: 'आवश्यक सेवा',
    message: 'संदेश',
    selectService: 'एक सेवा चुनें',
    phonePlaceholder: '10-अंकीय नंबर',
    messagePlaceholder: 'कृपया अपनी आवश्यकताओं का वर्णन करें',
    submitButton: 'जमा करें',
    
    // Form Validation Errors
    nameRequired: 'नाम आवश्यक है',
    emailRequired: 'ईमेल आवश्यक है',
    emailInvalid: 'कृपया एक मान्य ईमेल पता दर्ज करें',
    phoneRequired: 'फ़ोन नंबर आवश्यक है',
    phoneInvalid: 'कृपया एक मान्य 10-अंकीय फ़ोन नंबर दर्ज करें',
    serviceSelectRequired: 'कृपया एक सेवा चुनें',
    messageRequired: 'संदेश आवश्यक है',
    formErrors: 'फॉर्म में त्रुटियां हैं। कृपया उन्हें सुधारें और पुनः प्रयास करें।',
    formSuccess: 'फॉर्म सफलतापूर्वक जमा किया गया! हम जल्द ही आपसे संपर्क करेंगे।',
    formError: 'फॉर्म जमा करने में त्रुटि। कृपया पुनः प्रयास करें।',
    submitting: 'जमा हो रहा है',
    formSubmittedSuccess: 'फॉर्म सफलतापूर्वक जमा किया गया!',
    
    // Service Options
    serviceIsin: 'आईसिन निर्माण',
    serviceDemat: 'डीमैट सेवाएं',
    serviceCorporate: 'कॉर्पोरेट कार्रवाई',
    serviceEvoting: 'ई-वोटिंग सेवाएं',
    serviceOther: 'अन्य सेवाएं',
    
    // Education
    education1: 'वाणिज्य स्नातक, एमबीए',
    education2: 'बी.कॉम(ऑनर्स), एफआरएम, सीएफए स्तर 2',
    
    // Accessibility Statement Content
    accessibilityCommitment: 'सुलभता के प्रति हमारी प्रतिबद्धता',
    accessibilityIntro: 'नेक्स्टजेन शेयर रजिस्ट्री प्राइवेट लिमिटेड विकलांग व्यक्तियों के अधिकार अधिनियम, 2016 (आरपीडब्ल्यूडी अधिनियम) के अनुपालन में विकलांग लोगों के लिए डिजिटल सुलभता सुनिश्चित करने के लिए प्रतिबद्ध है। हम सभी के लिए उपयोगकर्ता अनुभव में लगातार सुधार कर रहे हैं और प्रासंगिक सुलभता मानकों को लागू कर रहे हैं।',
    conformanceStatus: 'अनुपालन स्थिति',
    conformanceIntro: 'यह पोर्टल निम्नलिखित के अनुरूप है:',
    wcagCompliance: 'WCAG 2.1 स्तर AA - वेब सामग्री सुलभता दिशानिर्देश',
    gigwCompliance: 'GIGW 3.0 - भारतीय सरकारी वेबसाइटों के लिए दिशानिर्देश',
    isCompliance: 'IS 17802:2020 - वेबसाइट सुलभता के लिए भारतीय मानक',
    rpwdCompliance: 'आरपीडब्ल्यूडी अधिनियम, 2016 - विकलांग व्यक्तियों के अधिकार अधिनियम',
    accessibilityFeaturesTitle: 'सुलभता सुविधाएँ',
    feature1: 'उचित शीर्षक पदानुक्रम के साथ सिमेंटिक HTML संरचना',
    feature2: 'पूरी साइट में कीबोर्ड नेविगेशन समर्थन',
    feature3: 'स्क्रीन रीडर संगतता (NVDA और VoiceOver के साथ परीक्षण किया गया)',
    feature4: 'न्यूनतम 4.5:1 अनुपात के साथ उच्च कंट्रास्ट टेक्स्ट',
    feature5: 'सभी छवियों के लिए वर्णनात्मक वैकल्पिक टेक्स्ट',
    feature6: 'उचित लेबल और त्रुटि संदेशों के साथ सुलभ फॉर्म',
    
    team1Desc: 'एमबीए के साथ अनुभवी वाणिज्य स्नातक और पूंजी बाजार में 24 से अधिक वर्षों का अनुभव। वह 14 से अधिक वर्षों से एक प्रमुख स्टॉकब्रोकिंग और डिपॉजिटरी फर्म में बोर्ड निदेशक रहे हैं, अनुपालन और डिपॉजिटरी डिवीजन का प्रबंधन करते हुए।',
    team1Cert1: 'कई एनआईएसएम प्रमाणपत्र',
    team1Cert2: 'बोर्ड निदेशक अनुभव',
    team1Cert3: 'अनुपालन विशेषज्ञ',
    
    team2Desc: 'बी.कॉम(ऑनर्स) वाणिज्य स्नातक जिसमें पूंजी बाजार और वित्त पर ध्यान केंद्रित है, एफआरएम प्रमाणन धारण करते हैं और सीएफए कार्यक्रम के स्तर 2 को पास किया है। उनके पास पूंजी बाजार का 3 वर्षों का अनुभव है और एक स्टॉकब्रोकिंग और डिपॉजिटरी फर्म में कार्यकारी भूमिका में काम करते हैं।',
    team2Cert1: 'एफआरएम प्रमाणन',
    team2Cert2: 'सीएफए स्तर 2',
    team2Cert3: 'कई एनआईएसएम प्रमाणपत्र',
    
    companyInfoTitle: 'नेक्स्टजेन शेयर रजिस्ट्री प्राइवेट लिमिटेड के बारे में',
    companyInfoDesc: '27 से अधिक वर्षों के संचयी पूंजी बाजार अनुभव के साथ, नेक्स्टजेन आरटीए आरटीए उद्योग में बदलाव लाने का प्रयास करता है, इसे अधिक पारदर्शी बनाकर और कंपनियों के लिए इस क्षेत्र में एक प्रतिष्ठित और सक्षम आरटीए नियुक्त करके संचालन करना आसान बनाता है।',
    
    // Testimonials
    testimonialsHeading: 'ग्राहक प्रशंसापत्र',
    testimonialsSubheading: 'हमारी सेवाओं के बारे में हमारे ग्राहक क्या कहते हैं',
    
    testimonial1: 'नेक्स्टजेन रजिस्ट्री हमारे शेयरधारक आधार को कुशलतापूर्वक प्रबंधित करने में सहायक रही है। आईसिन निर्माण और कॉर्पोरेट कार्रवाइयों में उनकी विशेषज्ञता बेजोड़ है।',
    testimonial1Company: 'अग्रणी आईटी कंपनी',
    testimonial1Industry: 'सूचना प्रौद्योगिकी',
    
    testimonial2: 'नेक्स्टजेन की टीम असाधारण सेवा गुणवत्ता प्रदान करती है। डिबेंचर प्रबंधन के लिए उनका टर्नअराउंड समय उद्योग में सबसे तेज़ है।',
    testimonial2Company: 'प्रमुख एनबीएफसी',
    testimonial2Industry: 'वित्तीय सेवाएं',
    
    testimonial3: 'पेशेवर, विश्वसनीय और पारदर्शी - नेक्स्टजेन रजिस्ट्री ने आरटीए सेवाओं के हर पहलू में हमारी अपेक्षाओं को पार कर दिया है।',
    testimonial3Company: 'फार्मास्युटिकल दिग्गज',
    testimonial3Industry: 'स्वास्थ्य सेवा',
    
    // Contact
    contactHeading: 'हमसे संपर्क करें',
    contactSubheading: 'विशेषज्ञ आरटीए सेवाओं के लिए हमारी टीम से संपर्क करें',
    
    // Accessibility
    accessibilityHeading: 'सुलभता वक्तव्य',
    accessibilitySubheading: 'सभी उपयोगकर्ताओं के लिए डिजिटल सुलभता के प्रति हमारी प्रतिबद्धता',
    
    // Footer
    footerContact: 'संपर्क जानकारी',
    footerQuickLinks: 'त्वरित लिंक',
    footerAccessibilitySupport: 'सुलभता सहायता',
    footerAccessibilityText: 'सुलभता मुद्दों या प्रतिक्रिया के लिए:',
    footerRights: 'सर्वाधिकार सुरक्षित',
    
    // Language & Accessibility
    languageLabel: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    readAloud: 'पृष्ठ सामग्री को जोर से पढ़ें',
    stopReading: 'पढ़ना बंद करें',
    switchToEnglish: 'अंग्रेजी में बदलें',
    switchToHindi: 'हिंदी में बदलें',
    skipToMain: 'मुख्य सामग्री पर जाएं',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  const getFullPageContent = (): string => {
    const trans = translations[language]
    return `
      ${trans.pageTitle}. ${trans.pageSubtitle}. ${trans.complianceNote}.
      
      ${trans.heroHeading}. ${trans.heroDescription}. ${trans.getStarted}. ${trans.learnMore}.
      
      ${trans.servicesHeading}. ${trans.servicesSubheading}.
      
      ${trans.service1Title}. ${trans.service1Desc}. ${trans.service1Point1}. ${trans.service1Point2}. ${trans.service1Point3}.
      
      ${trans.service2Title}. ${trans.service2Desc}. ${trans.service2Point1}. ${trans.service2Point2}. ${trans.service2Point3}.
      
      ${trans.service3Title}. ${trans.service3Desc}. ${trans.service3Point1}. ${trans.service3Point2}. ${trans.service3Point3}.
      
      ${trans.service4Title}. ${trans.service4Desc}. ${trans.service4Point1}. ${trans.service4Point2}. ${trans.service4Point3}.
      
      ${trans.whyHeading}. ${trans.whySubheading}.
      
      ${trans.why1Title}. ${trans.why1Desc}.
      ${trans.why2Title}. ${trans.why2Desc}.
      ${trans.why3Title}. ${trans.why3Desc}.
      ${trans.why4Title}. ${trans.why4Desc}.
      ${trans.why5Title}. ${trans.why5Desc}.
      ${trans.why6Title}. ${trans.why6Desc}.
      
      ${trans.missionTitle}. ${trans.missionDesc}.
      ${trans.valuesTitle}. ${trans.valuesDesc}.
      ${trans.visionTitle}. ${trans.visionDesc}.
      
      ${trans.teamHeading}. ${trans.teamSubheading}.
      ${trans.directorFounder}. ${trans.team1Desc}. ${trans.keyCertifications}. ${trans.team1Cert1}. ${trans.team1Cert2}. ${trans.team1Cert3}.
      ${trans.executiveDirector}. ${trans.team2Desc}. ${trans.team2Cert1}. ${trans.team2Cert2}. ${trans.team2Cert3}.
      ${trans.companyInfoTitle}. ${trans.companyInfoDesc}.
      
      ${trans.testimonialsHeading}. ${trans.testimonialsSubheading}.
      ${trans.testimonial1}. ${trans.testimonial1Company}. ${trans.testimonial1Industry}.
      ${trans.testimonial2}. ${trans.testimonial2Company}. ${trans.testimonial2Industry}.
      ${trans.testimonial3}. ${trans.testimonial3Company}. ${trans.testimonial3Industry}.
      
      ${trans.contactHeading}. ${trans.contactSubheading}.
      
      ${trans.accessibilityHeading}. ${trans.accessibilitySubheading}.
    `.trim()
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getFullPageContent }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
