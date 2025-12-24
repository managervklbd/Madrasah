--
-- PostgreSQL database dump
--

\restrict kD6684TzP5MCZbW30LPKwmhovw6R1sfBEcmnuUD6IZx3PAweWzsaK5NMRHcaVNQ

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: gallery_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gallery_images (
    id integer NOT NULL,
    title text NOT NULL,
    image_url text NOT NULL,
    caption text,
    media_type character varying(10) DEFAULT 'image'::character varying NOT NULL,
    is_featured character varying(5) DEFAULT 'false'::character varying NOT NULL
);


ALTER TABLE public.gallery_images OWNER TO postgres;

--
-- Name: gallery_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gallery_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gallery_images_id_seq OWNER TO postgres;

--
-- Name: gallery_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gallery_images_id_seq OWNED BY public.gallery_images.id;


--
-- Name: hero_slides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hero_slides (
    id integer NOT NULL,
    title text NOT NULL,
    media_url text NOT NULL,
    media_type character varying(10) DEFAULT 'image'::character varying NOT NULL,
    sort_order integer NOT NULL,
    description text,
    badge_text text,
    button_text text,
    button_link text
);


ALTER TABLE public.hero_slides OWNER TO postgres;

--
-- Name: hero_slides_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hero_slides_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hero_slides_id_seq OWNER TO postgres;

--
-- Name: hero_slides_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hero_slides_id_seq OWNED BY public.hero_slides.id;


--
-- Name: hero_slides_sort_order_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hero_slides_sort_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hero_slides_sort_order_seq OWNER TO postgres;

--
-- Name: hero_slides_sort_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hero_slides_sort_order_seq OWNED BY public.hero_slides.sort_order;


--
-- Name: notices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notices (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    date character varying(20) NOT NULL
);


ALTER TABLE public.notices OWNER TO postgres;

--
-- Name: notices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notices_id_seq OWNER TO postgres;

--
-- Name: notices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notices_id_seq OWNED BY public.notices.id;


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.site_settings (
    id integer NOT NULL,
    key character varying(50) NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.site_settings OWNER TO postgres;

--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.site_settings_id_seq OWNER TO postgres;

--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: gallery_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_images ALTER COLUMN id SET DEFAULT nextval('public.gallery_images_id_seq'::regclass);


--
-- Name: hero_slides id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hero_slides ALTER COLUMN id SET DEFAULT nextval('public.hero_slides_id_seq'::regclass);


--
-- Name: hero_slides sort_order; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hero_slides ALTER COLUMN sort_order SET DEFAULT nextval('public.hero_slides_sort_order_seq'::regclass);


--
-- Name: notices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notices ALTER COLUMN id SET DEFAULT nextval('public.notices_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Data for Name: gallery_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gallery_images (id, title, image_url, caption, media_type, is_featured) FROM stdin;
1	বার্ষিক মেধা পুরস্কার বিতরণ অনুষ্ঠান ২০২৫	https://scontent.fcgp27-1.fna.fbcdn.net/v/t39.30808-6/475327449_555248987516893_6824500007861272776_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=UheLVOYXRMAQ7kNvwH1w_M3&_nc_oc=Adkiko27FwJKjSNa7ZWyH7WWC3d4SDVFibOLxh8raRNvUHeUv9AQ3N8gW_UWAPY8o74&_nc_zt=23&_nc_ht=scontent.fcgp27-1.fna&_nc_gid=DwrmO43Hr__XTFaZlZXFwA&oh=00_Afk-dBTE9fBkObYm7eHBld4SsJYKTsUiVnA62hnmG-YIIw&oe=6951712C	মেধা ও শৃঙ্খলার স্বীকৃতি – আমাদের শিক্ষার্থীদের পুরস্কার বিতরণ অনুষ্ঠান	image	false
2	চমৎকার না'তে রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম	https://www.facebook.com/reel/690367819771359		video	false
3	মন জুরানো না’তে রাসুল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম	https://www.facebook.com/reel/946194443344653		video	false
\.


--
-- Data for Name: hero_slides; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hero_slides (id, title, media_url, media_type, sort_order, description, badge_text, button_text, button_link) FROM stdin;
3	বার্ষিক মেধা পুরস্কার বিতরণ অনুষ্ঠান ২০২৫	https://scontent.fcgp27-1.fna.fbcdn.net/v/t39.30808-6/475327449_555248987516893_6824500007861272776_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=UheLVOYXRMAQ7kNvwH1w_M3&_nc_oc=Adkiko27FwJKjSNa7ZWyH7WWC3d4SDVFibOLxh8raRNvUHeUv9AQ3N8gW_UWAPY8o74&_nc_zt=23&_nc_ht=scontent.fcgp27-1.fna&_nc_gid=-8vwEN6YNNicwnwj2fUOhQ&oh=00_AfkUdG6Ur8bjUEgG3i5Iki76GCshxga5EQErpJ_YVZcWog&oe=6951712C	image	3	\N	\N	\N	\N
4	ভর্তি চলছে!	/objects/uploads/19ff46f0-ce5b-413c-bf5e-cae3cf8761a7	image	4	মহাজমপুর হাফিজিয়া এতিমখানা মাদ্রাসা একটি আদর্শ কুরআন শিক্ষা প্রতিষ্ঠান। হিফজ, নাজেরা ও নূরানী বিভাগে অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে পাঠদান করা হয়। শিক্ষার্থীদের জন্য উন্নত আবাসন ও খাবারের সুব্যবস্থা রয়েছে।		যোগাযোগ করুন	#contact
\.


--
-- Data for Name: notices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notices (id, title, description, date) FROM stdin;
1	ভর্তি বিজ্ঞপ্তি ২০২৫	নতুন শিক্ষাবর্ষের জন্য ভর্তি কার্যক্রম শুরু হয়েছে। এতিম ও সাধারণ শিক্ষার্থীদের জন্য আসন সংখ্যা সীমিত। আগ্রহী অভিভাবকগণ যোগাযোগ করুন।	2025-01-15
2	বার্ষিক পরীক্ষার সময়সূচি	বার্ষিক পরীক্ষা আগামী মাসে অনুষ্ঠিত হবে। সকল শিক্ষার্থীদের প্রস্তুতি নেওয়ার জন্য অনুরোধ করা হচ্ছে।	2025-02-01
3	দোয়া ও মিলাদ মাহফিল	আগামী শুক্রবার জোহরের নামাযের পর মাদ্রাসা প্রাঙ্গণে দোয়া ও মিলাদ মাহফিল অনুষ্ঠিত হবে। সকলকে উপস্থিত থাকার জন্য আমন্ত্রণ জানানো হচ্ছে।	2024-12-20
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.site_settings (id, key, value) FROM stdin;
1	hero	{"name":"মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা","slogan":"কুরআন মাজিদ শিক্ষা কেন্দ্র","description":"দ্বীনি শিক্ষায় আদর্শ মানুষ গড়ার প্রত্যয়ে প্রতিষ্ঠিত","buttonText":"যোগাযোগ করুন"}
2	about	{"text":"মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা ১৯৯০ সাল থেকে এতিম ও সাধারণ শিক্ষার্থীদের হিফজুল কুরআন ও নৈতিক শিক্ষা প্রদান করে আসছে। আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে আদর্শ মানুষ ও সত্যিকারের মুসলিম হিসেবে গড়ে তোলা। এখানে শিক্ষার্থীরা পবিত্র কুরআন হিফজ করার পাশাপাশি ইসলামী আদব-কায়দা, নৈতিকতা এবং সমাজে কীভাবে একজন আদর্শ মানুষ হিসেবে বসবাস করতে হয় তা শেখে।","mission":"দ্বীনি শিক্ষার আলোয় আলোকিত করে প্রতিটি শিক্ষার্থীকে সমাজের জন্য উপযোগী, আদর্শ ও নৈতিক মানুষ হিসেবে গড়ে তোলা। আমরা বিশ্বাস করি প্রতিটি শিশুই আল্লাহর আমানত এবং তাদের সঠিক শিক্ষা ও পরিচর্যার মাধ্যমে উম্মাহর জন্য অবদান রাখতে সক্ষম।"}
3	branding	{"siteName":"মহজমপুর হাফিজিয়া এতিমখানা মাদরাসা","logoUrl":"https://scontent.fcgp27-1.fna.fbcdn.net/v/t39.30808-6/358542180_198155816559547_847349412040664274_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=IQcMf1dMGtMQ7kNvwFzi9Zu&_nc_oc=AdmTNjwAv8dsfvCboSi6jnYq1QOjZbEeeAW4CLO1ubzK8MJ_BLQdvdl4Yfb-Vd7uWQM&_nc_zt=23&_nc_ht=scontent.fcgp27-1.fna&_nc_gid=F0DWlHL_VVVdZhc6t_bg0A&oh=00_AfnU99lAAOoSQVnWyAGvuXwhiaY22v9YU9yOoijUyo0gRA&oe=69517EB5"}
\.


--
-- Name: gallery_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gallery_images_id_seq', 3, true);


--
-- Name: hero_slides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hero_slides_id_seq', 4, true);


--
-- Name: hero_slides_sort_order_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hero_slides_sort_order_seq', 4, true);


--
-- Name: notices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notices_id_seq', 4, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 4, true);


--
-- Name: gallery_images gallery_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_images
    ADD CONSTRAINT gallery_images_pkey PRIMARY KEY (id);


--
-- Name: hero_slides hero_slides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hero_slides
    ADD CONSTRAINT hero_slides_pkey PRIMARY KEY (id);


--
-- Name: notices notices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notices
    ADD CONSTRAINT notices_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_key_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_unique UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict kD6684TzP5MCZbW30LPKwmhovw6R1sfBEcmnuUD6IZx3PAweWzsaK5NMRHcaVNQ

