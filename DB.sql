--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    ssn integer NOT NULL,
    email character varying NOT NULL,
    fname character varying NOT NULL,
    mname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- Name: Attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attendance" (
    d_ssn integer NOT NULL,
    date character varying NOT NULL,
    arrival_time character varying,
    leave_time character varying
);


ALTER TABLE public."Attendance" OWNER TO postgres;

--
-- Name: Car; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Car" (
    car_license character varying NOT NULL,
    number_of_seats integer NOT NULL,
    air_conditioning boolean DEFAULT false NOT NULL,
    car_type character varying NOT NULL,
    additional_price double precision,
    d_ssn integer NOT NULL
);


ALTER TABLE public."Car" OWNER TO postgres;

--
-- Name: Driver; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Driver" (
    ssn integer NOT NULL,
    email character varying NOT NULL,
    fname character varying NOT NULL,
    mname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL,
    is_private boolean DEFAULT false NOT NULL,
    m_ssn integer,
    shift character varying,
    salary integer,
    s_id integer,
    is_available boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Driver" OWNER TO postgres;

--
-- Name: Lost & Found; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lost & Found" (
    t_id integer NOT NULL,
    item character varying NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public."Lost & Found" OWNER TO postgres;

--
-- Name: Manager; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Manager" (
    ssn integer NOT NULL,
    email character varying NOT NULL,
    fname character varying NOT NULL,
    mname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL,
    verified_by integer
);


ALTER TABLE public."Manager" OWNER TO postgres;

--
-- Name: Manager Finance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Manager Finance" (
    m_ssn integer NOT NULL,
    date date NOT NULL,
    salary double precision,
    total_profit double precision
);


ALTER TABLE public."Manager Finance" OWNER TO postgres;

--
-- Name: Passenger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Passenger" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    age integer,
    fname character varying(50),
    lname character varying(50),
    password character varying(255) NOT NULL
);


ALTER TABLE public."Passenger" OWNER TO postgres;

--
-- Name: Passenger Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Passenger Trip" (
    p_id integer NOT NULL,
    t_id integer NOT NULL,
    is_favourite boolean DEFAULT false NOT NULL,
    rate integer NOT NULL
);


ALTER TABLE public."Passenger Trip" OWNER TO postgres;

--
-- Name: Passenger_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Passenger_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Passenger_id_seq" OWNER TO postgres;

--
-- Name: Passenger_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Passenger_id_seq" OWNED BY public."Passenger".id;


--
-- Name: Private Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Private Trip" (
    order_id integer NOT NULL,
    source character varying(255) NOT NULL,
    destination character varying(255) NOT NULL,
    price double precision,
    estimated_time double precision DEFAULT 1,
    date character varying(255),
    d_ssn integer,
    p_id integer NOT NULL
);


ALTER TABLE public."Private Trip" OWNER TO postgres;

--
-- Name: Private Trip_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Private Trip_order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Private Trip_order_id_seq" OWNER TO postgres;

--
-- Name: Private Trip_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Private Trip_order_id_seq" OWNED BY public."Private Trip".order_id;


--
-- Name: Station; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Station" (
    station_id integer NOT NULL,
    station_name character varying NOT NULL,
    street character varying NOT NULL,
    zipcode character varying NOT NULL,
    governorate character varying NOT NULL,
    m_ssn integer
);


ALTER TABLE public."Station" OWNER TO postgres;

--
-- Name: Station_station_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Station_station_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Station_station_id_seq" OWNER TO postgres;

--
-- Name: Station_station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Station_station_id_seq" OWNED BY public."Station".station_id;


--
-- Name: Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Trip" (
    trip_id integer NOT NULL,
    price double precision NOT NULL,
    date character varying(255) NOT NULL,
    estimated_time double precision DEFAULT 1,
    d_ssn integer,
    source_station integer NOT NULL,
    destination_station integer NOT NULL,
    status character varying DEFAULT 'idle'::character varying NOT NULL
);


ALTER TABLE public."Trip" OWNER TO postgres;

--
-- Name: Trip_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Trip_trip_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Trip_trip_id_seq" OWNER TO postgres;

--
-- Name: Trip_trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Trip_trip_id_seq" OWNED BY public."Trip".trip_id;


--
-- Name: Vacation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vacation" (
    m_ssn integer NOT NULL,
    d_ssn integer NOT NULL,
    date character varying NOT NULL,
    status text DEFAULT false
);


ALTER TABLE public."Vacation" OWNER TO postgres;

--
-- Name: Passenger id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passenger" ALTER COLUMN id SET DEFAULT nextval('public."Passenger_id_seq"'::regclass);


--
-- Name: Private Trip order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Private Trip" ALTER COLUMN order_id SET DEFAULT nextval('public."Private Trip_order_id_seq"'::regclass);


--
-- Name: Station station_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Station" ALTER COLUMN station_id SET DEFAULT nextval('public."Station_station_id_seq"'::regclass);


--
-- Name: Trip trip_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip" ALTER COLUMN trip_id SET DEFAULT nextval('public."Trip_trip_id_seq"'::regclass);


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (ssn, email, fname, mname, lname, password) FROM stdin;
12341234	karimfarid@gmail.com	Karim	M	Farid	$2b$10$Ml8IV2WHxoDNTcqmz7rjeu2iJWgQ0KhsrByceKRtRrHj0V0N.DRym
1234	abc@gmail.com	Karim	Farid	Zakzouk	$2b$10$ryDDev7xZ9o1K6RqJR.dUeDcOUl7hMIztcCLeSERvq5QcFKA4aXCe
12341111	karimfarid2004@gmail.com	Karim	M	Farid	$2b$10$328dB.L3WUmpbKHRpymbMeD2S/BUAwIpi/0xjWTNIIyG1kEAZg4Pu
112233	asdasdasd@gmail.com	Karim	M	Farid	$2b$10$wMcy.uyaLKlqUishzN/xD.5zHbRfAZm6okGUxojmjWJYvNklKVn56
123321	abcabc@gmail.com	aaa	bbb	ccc	$2b$10$qrWFBzv.y5ZVBPymGpMEf.rieMMh.SyzrLhPYMo.c3D/aZYT02rRe
123456789	YousefAdel@gmail.com	Yousef	Adel	A	$2b$10$P75kVjS.nBlLY/g.Nkoe4uXge.U0s0ckdSbo1LqOlVkZ4phhW3GAS
13987	admin@gmail.com	Karim	Farid	Zakzouk	$2b$10$qEvZ2nWl4IPMmw0rY141.eiWXuQ2tP4VXSDfaX6u7YsVevWNOpxmm
\.


--
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attendance" (d_ssn, date, arrival_time, leave_time) FROM stdin;
321321	2024-12-20	1:18 PM	5:00:00 PM
\.


--
-- Data for Name: Car; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Car" (car_license, number_of_seats, air_conditioning, car_type, additional_price, d_ssn) FROM stdin;
123456789	14	t	Sedan	50	141224613
3152312	14	t	Sedan	34	321321
\.


--
-- Data for Name: Driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Driver" (ssn, email, fname, mname, lname, password, is_private, m_ssn, shift, salary, s_id, is_available) FROM stdin;
321321	driver@gmail.com	Karim	Farid	Zakzouk	$2b$10$5taqCAm.JTdPXgVMY1y0z.t52Qqb6wuC4AtQVJXNJk5dQHMvyXJJS	t	11223344	32	2111	6	t
141224613	john.doe123@example.com	John	A	Doe	$2b$10$KAm46Edi6XTtEbHQdIc2quSGn7wUAR08urH4SLBCByi5Jc1V2.O.q	f	\N	\N	\N	\N	t
\.


--
-- Data for Name: Lost & Found; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lost & Found" (t_id, item, quantity) FROM stdin;
\.


--
-- Data for Name: Manager; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Manager" (ssn, email, fname, mname, lname, password, verified_by) FROM stdin;
1	karim@gmail.com	karim\n	z	farid	12341234	\N
2	farid@gmail.com	farid	z	ahem	12341234	\N
3257932	example412@gmail.com	fulan	ellan	elfulany	$2b$10$UjcLBKZoA7bw6LTZrLsRfe2JAlqdAamvJ6EMa7isgnaVK4CuZcrBu	12341234
111112222	asdasd@gmail.com	Karim	M	Farid	$2b$10$BfK/NKqgxvx/m4OvrxLamemuj6ibVyB8lwltAwfOG8gK9lWofjMzG	\N
66996699	asdasdasdasd@gmail.com	asd	asd	asd	$2b$10$7udhqx5EHeqRtmbxdqwvLuAMlimMR3tKRJLx6V63KlMb6/qfw3yHG	\N
123123	asdasd231sd@gmail.com	asd	asd	asd	$2b$10$AqUiyquTpDHFlbI2GrUSNOROlKyOnmZJhahva0DZEQ1m/DLu1B3v2	\N
1231223	aasd1sd@gmail.com	asd	asd	asd	$2b$10$5LJZPYsBIbPf91RVyMPY5OJxEZHmEeI3oek3ZxwX3QURzQlFY5JGa	\N
4332	asa@gmail.com	asd	asd	asd	$2b$10$QvyeCHkp/Rc2uq3sQCSI3.a2ExevvfAk6LfAsfo6k9VXlmT2qeNZS	\N
12221222	karim1234@gmail.com	Karim	Farid	Zakzouk	$2b$10$T.Edi3soo3rmvtnMyIhGBOJ5h33cOAxAPEsmAaXxivmA/OVgde.Yq	\N
11113333	aaa@gmail.com	aaa	aaa	aaa	$2b$10$aoKhO48RbnqXqFRSvpd3oOGRwONsBwf2Ohdp5BsMkMaTAuXHFASIK	\N
11223344	manager@gmail.com	Karim	Farid	Zakzouk	$2b$10$vh6xETSPS5Pv9bhEUoAIJOu14oyCbxXDqU8JwJin9wTNK.UPt6Rm2	123321
\.


--
-- Data for Name: Manager Finance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Manager Finance" (m_ssn, date, salary, total_profit) FROM stdin;
11223344	2024-10-20	0	18504
11223344	2024-11-20	17504	18504
11223344	2024-12-20	7504	18504
\.


--
-- Data for Name: Passenger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Passenger" (id, email, age, fname, lname, password) FROM stdin;
6	john.doe@example.com	25	John	Doe	$2b$10$YRH4pIAC60WlsEIAC4i5x.uqdAHmO3gdci/7IMIC1dJAaq2XLObL2
7	jane.smith@example.com	30	Jane	Smith	$2b$10$OG.88Js9LprgaVRBxANxjuUOnecP6MUxYVlAhSMZSZCTj6Amc58pq
8	alice.johnson@example.com	22	Alice	Johnson	$2b$10$Ur22qYt0XISgjG6rtgxkQu9zXg8WvSeF2r1ZPp28Dba8cL5A0KHeS
9	bob.williams@example.com	28	Bob	Williams	$2b$10$oAhaa5WgeY4geEJ6tRuXW.wFotmRknMw6vmOr1dJr1mwPaPowe1.6
10	carol.brown@example.com	35	Carol	Brown	$2b$10$TaWnz4MwyFnGQZ6y3rFBN.5pPksDXuj3kQjTLCH1q0SMJYFXAU7gS
11	emma.anderson@example.com	24	Emma	Anderson	$2b$10$SA9ZU.JdHhSqCEFEbiXdSerQHygMBzWMYwMYnTiVsUlC0y1/9KtFi
12	frank.thomas@example.com	29	Frank	Thomas	$2b$10$dpbA7HHtUJymIr5loZwkFutC1JqtpTXj/uiwJfpG8CwrUhnBksyNO
13	grace.jackson@example.com	27	Grace	Jackson	$2b$10$vA9hHSpXckmsgomUA4ukBu2cGIzjAE3LzUzX7aIonWvGIend1y99a
14	henry.white@example.com	32	Henry	White	$2b$10$qtdNwJwvBX01rvoqgYV4Q.0Aer9XL.m58Jv4Ht3L558fJEioAalrS
15	ivy.harris@example.com	26	Ivy	Harris	$2b$10$zIqE4a70scl9VkMux5xRRe8OikSL017LEpowLsX7itIEn3xtOGGqu
16	jack.martin@example.com	33	Jack	Martin	$2b$10$VqCsEoTmQ7qN3U7coSi44.VUFP3lHf.LKn.ffJEyLIGKwpurQaAOK
17	kelly.clark@example.com	23	Kelly	Clark	$2b$10$Zh9C5Ce503lpZwaPZEZame2t5cOz1qBaNubvx1umnq2C7tphGyT6q
18	liam.lewis@example.com	31	Liam	Lewis	$2b$10$GQudf8M5MXsRKY3cVYB0fOM0szgYUr37c0VwoiaUj.mxXtX4RGpWK
19	mia.walker@example.com	29	Mia	Walker	$2b$10$HJSWSZdbiRo9U/7bAK6s7eXRXsk6dRrgrWv9oa5JNIpKXJbH/QCUW
20	noah.allen@example.com	33	Noah	Allen	$2b$10$QEgUdS7gmhe7XT6ebKZeLOjbkH.H4uLIXvXG2.qJjMcJKOj51Nky.
1	olivia.young@example.com	22	Olivia	Young	$2b$10$XO2waipZPL5fGN2zKlfSu.7to2KwT8MIsAyCzXiIQwa1.ImAAsBWW
2	peter.king@example.com	32	Peter	King	$2b$10$Ilhc.PbDQmZRjc/OIxPbBORti53c1jw5We7mg0G/l94i7AU4rS.mO
3	quinn.scott@example.com	25	Quinn	Scott	$2b$10$deEikW2F8kMFhLztzzI5Au4phGz1MLNWVMOvOVwf9Gn0sRrZbQoki
4	rachel.green@example.com	28	Rachel	Green	$2b$10$ZFuXXyNtVMA.MftI/GTghuT/lVNDzACqj7pxZBVi5JA1z4QgS60By
5	samuel.miller@example.com	26	Samuel	Miller	$2b$10$dlvsawLEIAyejCK/zSklcOK3AbvYbqoBtw/TKfH3ZUTRG9aCDC6ZG
21	passenger@gmail.com	24	Karim	Zakzouk	$2b$10$YPJy9FEu7dorDOvxyXZ8Ielmlf/8snueR/R9p/BvG62hdCQgYZXjm
22	passenger1@gmail.com	42	Karim	Zakzouk	$2b$10$eWkzJfJRAfGVpJ8ildJqDeexm0LmreZi2O0BgMUNafH7DZG2X3m.y
\.


--
-- Data for Name: Passenger Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Passenger Trip" (p_id, t_id, is_favourite, rate) FROM stdin;
6	23	f	5
6	24	t	1
6	22	t	5
\.


--
-- Data for Name: Private Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Private Trip" (order_id, source, destination, price, estimated_time, date, d_ssn, p_id) FROM stdin;
\.


--
-- Data for Name: Station; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Station" (station_id, station_name, street, zipcode, governorate, m_ssn) FROM stdin;
1	12341	dsadsa	dsadsa	dsadasd	1
5	asd	asd	asd	asd	\N
6	Giza Station	El Mehwar	38164	Cario	11223344
\.


--
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Trip" (trip_id, price, date, estimated_time, d_ssn, source_station, destination_station, status) FROM stdin;
25	2313	2024-12-20T11:38:20.325Z	1	321321	6	1	accepted
18	2313	2024-12-20T11:38:18.693Z	1	321321	6	1	accepted
19	2313	2024-12-20T11:38:19.397Z	1	321321	6	1	accepted
20	2313	2024-12-20T11:38:19.589Z	1	321321	6	1	accepted
21	2313	2024-12-20T11:38:19.733Z	1	321321	6	1	accepted
22	2313	2024-12-20T11:38:19.869Z	1	321321	6	1	started
23	2313	2024-12-20T11:38:20.021Z	1	321321	6	1	started
24	2313	2024-12-20T11:38:20.173Z	1	321321	6	1	started
14	213	2024-12-15T00:46:26.278Z	1	253850923	5	1	started
6	12313	2024-12-15T00:45:39.133Z	1	253850923	5	1	started
15	12313	2024-12-15T00:46:26.406Z	1	253850923	5	1	started
16	12313	2024-12-15T00:46:26.550Z	1	253850923	5	1	started
17	12313	2024-12-15T00:46:26.710Z	1	253850923	5	1	started
2	123131	2024-12-15T00:42:25.326Z	1	253850923	5	1	started
1	12313	2024-12-15T00:45:36.997Z	1	253850923	5	1	started
4	12313	2024-12-15T00:45:38.030Z	1	253850923	5	1	started
5	12313	2024-12-15T00:45:38.189Z	1	253850923	5	1	started
3	123132123	2024-12-13T20:09:40.233Z	1	253850923	5	1	rejected
8	12313	2024-12-15T00:45:39.742Z	1	253850923	5	1	started
9	12313	2024-12-15T00:45:39.958Z	1	253850923	5	1	started
10	12313	2024-12-15T00:45:40.102Z	1	253850923	5	1	started
11	12313	2024-12-15T00:46:25.854Z	1	253850923	5	1	started
12	12313	2024-12-15T00:46:26.014Z	1	253850923	5	1	started
13	12313	2024-12-15T00:46:26.151Z	1	253850923	5	1	started
7	123	2024-12-15T00:45:39.517Z	1	253850923	5	1	started
\.


--
-- Data for Name: Vacation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vacation" (m_ssn, d_ssn, date, status) FROM stdin;
1	321321	2024-12-24	pending
11223344	321321	2024-12-26	accepted
11223344	321321	2024-12-31	rejected
\.


--
-- Name: Passenger_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Passenger_id_seq"', 22, true);


--
-- Name: Private Trip_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Private Trip_order_id_seq"', 17, true);


--
-- Name: Station_station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Station_station_id_seq"', 5, true);


--
-- Name: Trip_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Trip_trip_id_seq"', 1, false);


--
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (d_ssn, date);


--
-- Name: Car Car_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "Car_pkey" PRIMARY KEY (car_license);


--
-- Name: Lost & Found Lost & Found_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lost & Found"
    ADD CONSTRAINT "Lost & Found_pkey" PRIMARY KEY (t_id, item);


--
-- Name: Manager Finance Manager Finance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager Finance"
    ADD CONSTRAINT "Manager Finance_pkey" PRIMARY KEY (m_ssn, date);


--
-- Name: Passenger Trip Passenger Trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passenger Trip"
    ADD CONSTRAINT "Passenger Trip_pkey" PRIMARY KEY (p_id, t_id);


--
-- Name: Passenger Passenger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passenger"
    ADD CONSTRAINT "Passenger_pkey" PRIMARY KEY (id);


--
-- Name: Private Trip Private Trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Private Trip"
    ADD CONSTRAINT "Private Trip_pkey" PRIMARY KEY (order_id);


--
-- Name: Station Station_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY (station_id);


--
-- Name: Trip Trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_pkey" PRIMARY KEY (trip_id);


--
-- Name: Vacation Vacation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vacation"
    ADD CONSTRAINT "Vacation_pkey" PRIMARY KEY (m_ssn, d_ssn, date);


--
-- Name: Admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- Name: Admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_pkey PRIMARY KEY (ssn);


--
-- Name: Driver driver_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_email_key UNIQUE (email);


--
-- Name: Driver driver_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_pkey PRIMARY KEY (ssn);


--
-- Name: Manager manager_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_email_key UNIQUE (email);


--
-- Name: Manager manager_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_pkey PRIMARY KEY (ssn);


--
-- Name: Attendance Attendance_D_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_D_SSN_fkey" FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Car D_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "D_SSN_fkey" FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Lost & Found Lost & Found_t_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lost & Found"
    ADD CONSTRAINT "Lost & Found_t_id_fkey" FOREIGN KEY (t_id) REFERENCES public."Trip"(trip_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Manager Finance Manager Finance_M_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager Finance"
    ADD CONSTRAINT "Manager Finance_M_SSN_fkey" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Manager Manager_verifiedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT "Manager_verifiedBy_fkey" FOREIGN KEY (verified_by) REFERENCES public."Admin"(ssn) ON UPDATE CASCADE NOT VALID;


--
-- Name: Private Trip Private Trip_d_ssn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Private Trip"
    ADD CONSTRAINT "Private Trip_d_ssn_fkey" FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Private Trip Private Trip_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Private Trip"
    ADD CONSTRAINT "Private Trip_p_id_fkey" FOREIGN KEY (p_id) REFERENCES public."Passenger"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Vacation Vacation_m_ssn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vacation"
    ADD CONSTRAINT "Vacation_m_ssn_fkey" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Driver fkey_MSSN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "fkey_MSSN" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: Station fkey_MSSN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "fkey_MSSN" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: Driver fkey_StationID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "fkey_StationID" FOREIGN KEY (s_id) REFERENCES public."Station"(station_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: Trip fkey_Trip_destination_station; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "fkey_Trip_destination_station" FOREIGN KEY (destination_station) REFERENCES public."Station"(station_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Trip fkey_Trip_source_station; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "fkey_Trip_source_station" FOREIGN KEY (source_station) REFERENCES public."Station"(station_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Vacation fkey_Vacation_D_SSN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vacation"
    ADD CONSTRAINT "fkey_Vacation_D_SSN" FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Passenger Trip fkey_p_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passenger Trip"
    ADD CONSTRAINT fkey_p_id FOREIGN KEY (p_id) REFERENCES public."Passenger"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Passenger Trip fkey_t_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passenger Trip"
    ADD CONSTRAINT fkey_t_id FOREIGN KEY (t_id) REFERENCES public."Trip"(trip_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

