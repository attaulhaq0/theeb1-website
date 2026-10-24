-- ============================================
-- HOSTINGER MySQL DATABASE SETUP SCRIPT
-- theEb1 Website - Complete CMS Database Schema
-- ============================================
-- Instructions:
-- 1. Log into Hostinger hPanel
-- 2. Go to Databases > MySQL Databases
-- 3. Create a new database (e.g., "theeb1_db")
-- 4. Create a database user and assign to database
-- 5. Open phpMyAdmin
-- 6. Select your database
-- 7. Go to SQL tab and paste this entire script
-- 8. Click "Go" to execute
-- ============================================

-- Set character encoding
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- TABLE: contact_submissions
-- Stores contact form submissions
-- ============================================
DROP TABLE IF EXISTS `contact_submissions`;
CREATE TABLE `contact_submissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(50) DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: newsletter_subscriptions
-- Stores newsletter email subscriptions
-- ============================================
DROP TABLE IF EXISTS `newsletter_subscriptions`;
CREATE TABLE `newsletter_subscriptions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'active',
  `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: consultation_bookings
-- Stores consultation booking requests
-- ============================================
DROP TABLE IF EXISTS `consultation_bookings`;
CREATE TABLE `consultation_bookings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `preferred_date` DATETIME DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_preferred_date` (`preferred_date`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: testimonials
-- Stores client testimonials
-- ============================================
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(150) DEFAULT NULL,
  `company` VARCHAR(150) DEFAULT NULL,
  `quote` TEXT NOT NULL,
  `rating` TINYINT UNSIGNED DEFAULT 5,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_is_featured` (`is_featured`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: blog_posts
-- Stores blog articles
-- ============================================
DROP TABLE IF EXISTS `blog_posts`;
CREATE TABLE `blog_posts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `excerpt` TEXT DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `author` VARCHAR(100) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `tags` VARCHAR(500) DEFAULT NULL,
  `is_published` TINYINT(1) DEFAULT 0,
  `published_at` DATETIME DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_slug` (`slug`),
  INDEX `idx_is_published` (`is_published`),
  INDEX `idx_published_at` (`published_at`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: case_studies
-- Stores success stories / case studies
-- ============================================
DROP TABLE IF EXISTS `case_studies`;
CREATE TABLE `case_studies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `client_name` VARCHAR(100) DEFAULT NULL,
  `client_industry` VARCHAR(100) DEFAULT NULL,
  `visa_type` VARCHAR(50) DEFAULT NULL,
  `challenge` TEXT DEFAULT NULL,
  `solution` TEXT DEFAULT NULL,
  `outcome` TEXT DEFAULT NULL,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `is_published` TINYINT(1) DEFAULT 0,
  `display_order` INT DEFAULT 0,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_slug` (`slug`),
  INDEX `idx_is_published` (`is_published`),
  INDEX `idx_visa_type` (`visa_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: faqs
-- Stores frequently asked questions
-- ============================================
DROP TABLE IF EXISTS `faqs`;
CREATE TABLE `faqs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(500) NOT NULL,
  `answer` TEXT NOT NULL,
  `category` VARCHAR(100) DEFAULT 'General',
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: team_members
-- Stores leadership / team information
-- ============================================
DROP TABLE IF EXISTS `team_members`;
CREATE TABLE `team_members` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `bio` TEXT DEFAULT NULL,
  `expertise` JSON DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `linkedin_url` VARCHAR(500) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: pricing_plans
-- Stores pricing packages
-- ============================================
DROP TABLE IF EXISTS `pricing_plans`;
CREATE TABLE `pricing_plans` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` VARCHAR(50) NOT NULL,
  `currency` VARCHAR(10) DEFAULT 'USD',
  `billing_period` VARCHAR(50) DEFAULT 'Per year',
  `description` TEXT DEFAULT NULL,
  `features` JSON DEFAULT NULL,
  `is_popular` TINYINT(1) DEFAULT 0,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `cta_text` VARCHAR(100) DEFAULT 'GET STARTED',
  `cta_link` VARCHAR(500) DEFAULT '/contact',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: visa_pages
-- Stores visa information page content (EB1A, EB2NIW, O1A)
-- ============================================
DROP TABLE IF EXISTS `visa_pages`;
CREATE TABLE `visa_pages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `visa_type` VARCHAR(50) NOT NULL,
  `page_title` VARCHAR(255) NOT NULL,
  `hero_title` VARCHAR(255) DEFAULT NULL,
  `hero_subtitle` TEXT DEFAULT NULL,
  `overview` TEXT DEFAULT NULL,
  `eligibility_criteria` JSON DEFAULT NULL,
  `benefits` JSON DEFAULT NULL,
  `process_steps` JSON DEFAULT NULL,
  `requirements` JSON DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_visa_type` (`visa_type`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: page_content
-- Stores general page content (Our Story, Why Choose Us, Home sections)
-- ============================================
DROP TABLE IF EXISTS `page_content`;
CREATE TABLE `page_content` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `page_key` VARCHAR(100) NOT NULL,
  `section_key` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `subtitle` VARCHAR(500) DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `cta_text` VARCHAR(100) DEFAULT NULL,
  `cta_link` VARCHAR(500) DEFAULT NULL,
  `extra_data` JSON DEFAULT NULL,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_page_section` (`page_key`, `section_key`),
  INDEX `idx_page_key` (`page_key`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: statistics
-- Stores site-wide statistics (approval rates, clients helped, etc.)
-- ============================================
DROP TABLE IF EXISTS `statistics`;
CREATE TABLE `statistics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `stat_key` VARCHAR(100) NOT NULL,
  `stat_value` INT NOT NULL,
  `stat_suffix` VARCHAR(20) DEFAULT '',
  `stat_label` VARCHAR(150) NOT NULL,
  `icon` VARCHAR(50) DEFAULT NULL,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_stat_key` (`stat_key`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: company_logos
-- Stores partner/client company logos
-- ============================================
DROP TABLE IF EXISTS `company_logos`;
CREATE TABLE `company_logos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(150) NOT NULL,
  `logo_url` VARCHAR(500) NOT NULL,
  `website_url` VARCHAR(500) DEFAULT NULL,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: hero_slides
-- Stores hero slider content
-- ============================================
DROP TABLE IF EXISTS `hero_slides`;
CREATE TABLE `hero_slides` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` TEXT DEFAULT NULL,
  `background_image` VARCHAR(500) DEFAULT NULL,
  `cta_text` VARCHAR(100) DEFAULT 'Evaluate Your Profile',
  `cta_link` VARCHAR(500) DEFAULT '/contact',
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: site_settings
-- Stores global site configuration
-- ============================================
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100) NOT NULL,
  `setting_value` TEXT DEFAULT NULL,
  `setting_type` VARCHAR(50) DEFAULT 'text',
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: admin_users
-- Stores admin login credentials
-- ============================================
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username` (`username`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- INSERT DEFAULT DATA (MATCHING FRONTEND)
-- ============================================

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_type`, `description`) VALUES
('site_name', 'theEb1', 'text', 'Website name'),
('site_tagline', 'Your Path to the American Dream', 'text', 'Website tagline'),
('contact_email', 'info@theeb1.com', 'email', 'Main contact email'),
('contact_phone', '+1 (555) 123-4567', 'text', 'Main contact phone'),
('contact_address', '123 Immigration Way, New York, NY 10001', 'text', 'Office address'),
('facebook_url', '', 'url', 'Facebook page URL'),
('twitter_url', '', 'url', 'Twitter profile URL'),
('linkedin_url', '', 'url', 'LinkedIn page URL'),
('instagram_url', '', 'url', 'Instagram profile URL');

-- ============================================
-- STATISTICS (From Home.tsx AnimatedCounter)
-- ============================================
INSERT INTO `statistics` (`stat_key`, `stat_value`, `stat_suffix`, `stat_label`, `display_order`) VALUES
('eb1a_approvals', 200, '+', 'EB1A Approvals', 1),
('eb1a_approval_rate', 85, '%', 'EB1A Approval Rate*', 2),
('o1a_approval_rate', 100, '%', 'O-1A Approval Rate*', 3);

-- ============================================
-- TESTIMONIALS (From TestimonialCarousel.tsx)
-- ============================================
INSERT INTO `testimonials` (`name`, `role`, `company`, `quote`, `rating`, `is_featured`, `display_order`) VALUES
('Dr. Sarah Chen', 'AI Research Scientist', 'Google', 'theEb1 helped me navigate the complex EB1A process with ease. Their expertise and personalized approach made all the difference.', 5, 1, 1),
('Michael Rodriguez', 'Senior Software Engineer', 'Meta', 'The team\'s knowledge of immigration law and tech industry requirements is outstanding. Got my green card approved in record time!', 5, 1, 2),
('Priya Sharma', 'Data Scientist', 'Amazon', 'Professional, efficient, and always available to answer questions. theEb1 made my EB1A journey smooth and stress-free.', 5, 1, 3),
('James Wilson', 'CTO', 'Startup Founder', 'Their AI-powered approach to building my case was revolutionary. Highly recommend theEb1 to any tech professional.', 5, 1, 4);

-- ============================================
-- FAQS (From FAQSection.tsx - Homepage FAQs)
-- ============================================
INSERT INTO `faqs` (`question`, `answer`, `category`, `display_order`) VALUES
-- Homepage FAQs
('What is the EB1A visa and who qualifies?', 'The EB1A visa is for individuals with extraordinary ability in sciences, arts, education, business, or athletics. You must demonstrate sustained national or international acclaim and meet at least 3 out of 10 USCIS criteria. No job offer or employer sponsorship is required.', 'General', 1),
('How long does the EB1A process typically take?', 'The EB1A processing time varies, but typically takes 6-12 months for premium processing or 12-18 months for regular processing. With our strategic approach and comprehensive documentation, many of our clients experience faster approval times.', 'General', 2),
('Can I include my family in my EB1A application?', 'Yes! Your spouse and unmarried children under 21 can be included as derivative beneficiaries. They will receive green cards along with you and can live, work, and study in the United States.', 'General', 3),
('What makes theEb1 different from other immigration services?', 'We combine expert immigration knowledge with tech industry expertise, AI-powered tools, and personalized strategies. Our comprehensive approach helps applicants meet 6-7 USCIS criteria (far exceeding the minimum of 3), leading to stronger cases and higher approval rates.', 'General', 4),
('Do you provide legal representation before USCIS?', 'We are not a law firm and do not provide legal representation. However, we offer expert consultation, case strategy, documentation support, and can connect you with top US-licensed attorneys at discounted rates (up to $3,500 off) through our VIP plans.', 'General', 5),

-- EB1A General (From FAQs.tsx)
('What is the EB1A visa?', 'The EB-1A is a first-preference employment-based immigrant visa for individuals with extraordinary ability in sciences, arts, education, business, or athletics. It allows you to self-petition for a Green Card without employer sponsorship.', 'EB1A General', 6),
('Do I need a job offer for EB1A?', 'No, the EB1A does not require a job offer or employer sponsorship. You can self-petition and demonstrate that you will continue to work in your area of extraordinary ability.', 'EB1A General', 7),
('How long does the EB1A process take?', 'Processing times vary but typically range from 6-12 months for regular processing. Premium processing (15 calendar days) is available for an additional fee of $2,500.', 'EB1A General', 8),
('What are the 10 USCIS criteria for EB1A?', 'The criteria include: major awards, membership in exclusive associations, published material about you, judging others\' work, original contributions, scholarly articles, exhibitions/showcases, leading roles, high salary, and commercial successes in performing arts.', 'EB1A General', 9),

-- Eligibility
('How many criteria do I need to meet?', 'You must meet at least 3 of the 10 USCIS criteria. However, we recommend building a case that addresses 6-7 criteria for a stronger petition and higher approval chances.', 'Eligibility', 10),
('Can I qualify without a PhD or publications?', 'Yes! Many tech professionals qualify based on their professional achievements, open-source contributions, leadership roles, high compensation, and industry recognition without traditional academic credentials.', 'Eligibility', 11),
('Do I need patents or citations?', 'No, patents and citations are not mandatory. Many successful EB1A petitions are based on professional experience, contributions to projects, leadership roles, and industry recognition.', 'Eligibility', 12),
('Can software engineers qualify for EB1A?', 'Absolutely! Software engineers can qualify through open-source contributions, technical leadership, conference presentations, technical blogs, judging roles, and high compensation.', 'Eligibility', 13),

-- Process & Timeline
('What is premium processing?', 'Premium processing guarantees a response from USCIS within 15 calendar days for an additional fee of $2,500. It\'s available for EB1A petitions and can significantly expedite the process.', 'Process & Timeline', 14),
('What happens after I file my EB1A petition?', 'After filing, USCIS will review your petition. You may receive a Request for Evidence (RFE) if they need additional information, or you\'ll receive an approval notice. Once approved, you can apply for adjustment of status or consular processing.', 'Process & Timeline', 15),
('Can I travel while my EB1A is pending?', 'Yes, if you\'re on a valid visa status. If you\'ve filed for adjustment of status, you should obtain Advance Parole before traveling internationally.', 'Process & Timeline', 16),
('What is the success rate for EB1A?', 'Our success rate is 80-85% for EB1A petitions. National approval rates vary, which is why working with experienced immigration professionals is crucial for maximizing your chances.', 'Process & Timeline', 17),

-- O1A Visa
('What is the difference between O1A and EB1A?', 'O1A is a temporary work visa requiring employer sponsorship, while EB1A is a permanent residency (Green Card) self-petition. O1A has faster processing but requires renewal, whereas EB1A leads to permanent residency.', 'O1A Visa', 18),
('Can I apply for both O1A and EB1A?', 'Yes, many professionals start with O1A for faster entry to the US while simultaneously preparing their EB1A petition for permanent residency.', 'O1A Visa', 19),
('How long is the O1A visa valid?', 'O1A visas are initially granted for up to 3 years and can be extended in 1-year increments with no maximum limit.', 'O1A Visa', 20),

-- EB2-NIW
('What is EB2-NIW?', 'EB2-NIW is a second-preference employment-based visa that waives the job offer requirement if your work is in the national interest of the United States.', 'EB2-NIW', 21),
('Should I apply for EB1A or EB2-NIW?', 'EB1A is first-preference with potentially faster processing but higher burden of proof. EB2-NIW is second-preference with more flexible requirements. We can help you determine which is better for your profile.', 'EB2-NIW', 22),
('Can I apply for both EB1A and EB2-NIW?', 'Yes, you can file concurrent petitions to maximize your chances of approval, though this involves additional costs.', 'EB2-NIW', 23),

-- Costs & Services
('How much does EB1A cost?', 'USCIS filing fees are $700 for Form I-140. Premium processing is an additional $2,500. Professional services fees vary based on the complexity of your case. Contact us for a personalized quote.', 'Costs & Services', 24),
('What services do you provide?', 'We provide comprehensive EB1A services including profile evaluation, strategy development, evidence compilation, petition preparation, document review, and RFE responses.', 'Costs & Services', 25),
('Do you offer consultations?', 'Yes, we offer initial consultations to evaluate your profile and discuss your immigration options. Contact us to schedule a consultation.', 'Costs & Services', 26),
('What is Turing AI?', 'Turing AI is our proprietary AI-powered platform that analyzes your profile against USCIS criteria, identifies strengths and gaps, and provides tailored recommendations to optimize your EB1A petition.', 'Costs & Services', 27);

-- ============================================
-- PRICING PLANS (From PricingSection.tsx)
-- ============================================
INSERT INTO `pricing_plans` (`name`, `price`, `billing_period`, `features`, `is_popular`, `display_order`, `cta_text`, `cta_link`) VALUES
('Basic', '$199', 'Per year', '["Carefully crafted components", "Amazing page examples", "Super friendly support team", "Awesome Support"]', 0, 1, 'GET STARTED', '/contact'),
('Pro', '$399', 'Per year', '["Carefully crafted components", "Amazing page examples", "Super friendly support team", "Awesome Support"]', 0, 2, 'GET STARTED', '/contact'),
('Enterprise', '$699', 'Per year', '["Carefully crafted components", "Amazing page examples", "Super friendly support team", "Awesome Support"]', 0, 3, 'GET STARTED', '/contact');

-- ============================================
-- HERO SLIDES (From HeroSlider.tsx)
-- ============================================
INSERT INTO `hero_slides` (`title`, `subtitle`, `cta_text`, `cta_link`, `display_order`) VALUES
('Fast-Track Your Green Card with EB1A Experts Guidance', 'We support tech professionals in securing their EB1A Green Card with expert-level insights and customized assistance.', 'Evaluate Your Profile', '/contact', 1),
('Build Your Future in the U.S. with the O1A Visa', 'For High-Achieving Professionals in Business, Science, Technology, and Beyond', 'Evaluate Your Profile', '/contact', 2),
('Secure Your Green Card Through EB2-NIW', 'No Job Offer or Employer Sponsorship Required — Apply Based on Your Impact and Merit', 'Evaluate Your Profile', '/contact', 3);

-- ============================================
-- COMPANY LOGOS (From CompanyLogos.tsx)
-- ============================================
INSERT INTO `company_logos` (`company_name`, `logo_url`, `display_order`) VALUES
('Google', 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 1),
('Meta', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', 2),
('Amazon', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', 3),
('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', 4),
('Apple', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', 5),
('Netflix', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', 6);

-- ============================================
-- TEAM MEMBERS (From Leadership.tsx)
-- ============================================
INSERT INTO `team_members` (`name`, `title`, `bio`, `expertise`, `display_order`) VALUES
('Raghu Raghavan', 'Founder & CEO', 'Former tech professional turned immigration expert with personal EB1A experience. Raghu founded EB1A Experts to help fellow tech professionals navigate the complex Green Card process. With deep understanding of both technology and immigration law, he has helped 200+ professionals achieve their American Dream.', '["EB1A Strategy", "Tech Industry Immigration", "USCIS Criteria Analysis"]', 1),
('Sarah Chen', 'Director of Operations', 'Immigration specialist with 10+ years of experience in employment-based immigration. Sarah oversees all petition preparations and ensures meticulous attention to USCIS requirements. Her expertise in evidence compilation has contributed to our industry-leading success rates.', '["Petition Preparation", "Evidence Documentation", "RFE Responses"]', 2),
('Michael Rodriguez', 'Senior Immigration Consultant', 'Former USCIS adjudicator with insider knowledge of the petition review process. Michael brings unique insights into what makes a compelling EB1A case and how to present achievements most effectively.', '["USCIS Procedures", "Case Strategy", "Adjudication Insights"]', 3),
('Dr. Priya Patel', 'Technical Achievements Specialist', 'PhD in Computer Science with extensive research and industry experience. Dr. Patel specializes in translating technical achievements into compelling evidence for USCIS, particularly for professionals in AI, machine learning, and software engineering.', '["Technical Evidence", "Research Documentation", "Academic Achievements"]', 4);

-- ============================================
-- VISA PAGES (EB1A, O1A, EB2-NIW content)
-- ============================================
INSERT INTO `visa_pages` (`visa_type`, `page_title`, `hero_title`, `hero_subtitle`, `overview`, `eligibility_criteria`, `benefits`) VALUES
('EB1A', 'EB1A Visa (Green Card)', 'EB1A Visa (Green Card)', 'The premier path to permanent residency for individuals with extraordinary ability in sciences, arts, education, business, or athletics.', 'The EB-1A visa is a first-preference employment-based immigration category for individuals who have extraordinary ability in their field. This self-petition option allows you to obtain a Green Card without employer sponsorship or a job offer. To qualify, you must demonstrate sustained national or international acclaim and provide evidence that you meet at least three of the ten USCIS criteria.', 
'["Receipt of major internationally-recognized awards or prizes", "Membership in associations requiring outstanding achievements", "Published material about you in professional publications", "Participation as a judge of the work of others in your field", "Original scientific, scholarly, or business-related contributions", "Authorship of scholarly articles in professional publications", "Display of your work at artistic exhibitions or showcases", "Performance in a leading or critical role for organizations", "High salary or remuneration compared to others in the field", "Commercial successes in the performing arts"]',
'["No employer sponsorship required - self-petition", "No labor certification needed", "Priority processing available", "Faster path to permanent residency", "Include spouse and unmarried children under 21", "Live and work anywhere in the United States", "Path to U.S. citizenship after 5 years"]'),

('O1A', 'O1A Visa', 'O1A Extraordinary Ability Visa', 'A non-immigrant work visa for individuals with extraordinary ability in sciences, business, education, or athletics.', 'The O-1A visa is a non-immigrant visa for individuals who possess extraordinary ability in the sciences, education, business, or athletics. It requires employer sponsorship but offers a flexible path to work in the United States.', 
'["Major awards or prizes recognition", "Membership in associations requiring outstanding achievement", "Published material in major media about the applicant", "Judging the work of others", "Original contributions of major significance", "Authorship of scholarly articles", "Employment in a critical or essential capacity", "High salary or remuneration"]',
'["Work in the US with extraordinary ability recognition", "Initial stay up to 3 years", "Unlimited extensions available", "Dual intent allowed", "Dependents can accompany on O-3 visa"]'),

('EB2NIW', 'EB2-NIW Visa', 'EB2 National Interest Waiver', 'A second-preference employment-based visa with a national interest waiver that eliminates the need for employer sponsorship.', 'The EB-2 National Interest Waiver (NIW) is a category of the EB-2 visa that allows professionals with advanced degrees or exceptional ability to self-petition for a Green Card if their work is in the national interest of the United States.', 
'["Advanced degree (Masters or higher) OR Exceptional ability in sciences, arts, or business", "Proposed endeavor has substantial merit and national importance", "Well positioned to advance the proposed endeavor", "On balance, beneficial to the US to waive job offer requirement"]',
'["No employer sponsorship required", "No labor certification (PERM) needed", "Self-petition allowed", "Concurrent filing with I-485 possible", "Path to permanent residency", "Include spouse and children under 21"]');

-- ============================================
-- PAGE CONTENT (Home page sections, About, etc.)
-- ============================================
INSERT INTO `page_content` (`page_key`, `section_key`, `title`, `subtitle`, `content`, `cta_text`, `cta_link`, `display_order`) VALUES
('home', 'who_are_we', 'Who are we?', NULL, 'At theEb1, we empower tech professionals on their EB1A Green Card journey with personalized strategies and end-to-end support, ensuring a seamless process. Our comprehensive approach helps applicants meet 6-7 out of the 10 USCIS criteria — far exceeding the minimum requirement of three. This meticulous strategy strengthens cases, often leading to faster approvals and a smoother path to permanent residency.', 'Book Your Slot Now', '/contact', 1),
('home', 'guidance_cta', 'Guiding you in every step to EB1A success!', 'Expert advice, tailored for you—with transparency and support throughout your journey.', NULL, 'Book Your Slot Now', '/contact', 2),
('home', 'why_choose_us', 'Why Choose theEb1?', NULL, 'The EB1A visa is designed for individuals with extraordinary ability in their field. It offers a direct path to a U.S. Green Card without requiring employer sponsorship or a job offer.', NULL, NULL, 3),
('home', 'trusted_by', 'Trusted by Top Tech Professionals', NULL, NULL, NULL, NULL, 4),
('home', 'testimonials_header', 'Client Success Stories', 'Hear from professionals who successfully achieved their immigration goals', NULL, 'View All Testimonials', '/testimonials', 5),
('home', 'stats_disclaimer', NULL, NULL, '* Disclaimer: Our past success rate is based on historical data and reflects the outcomes of prior cases. However, past performance does not guarantee future results. Each case is unique and evaluated on its individual merits by immigration authorities.', NULL, NULL, 6);

-- ============================================
-- End of script
-- ============================================
