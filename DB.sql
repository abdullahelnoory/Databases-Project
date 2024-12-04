--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

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
    date date NOT NULL,
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
    "Shift" character varying,
    "Salary" integer,
    "Station_ID" integer
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
    email character varying NOT NULL,
    age integer NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."Passenger" OWNER TO postgres;

--
-- Name: Private Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Private Trip" (
    order_id integer NOT NULL,
    source character varying NOT NULL,
    destination character varying NOT NULL,
    price double precision NOT NULL,
    estimated_time double precision NOT NULL,
    data character varying NOT NULL,
    d_ssn integer NOT NULL,
    p_id integer NOT NULL
);


ALTER TABLE public."Private Trip" OWNER TO postgres;

--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    p_id integer NOT NULL,
    t_id integer NOT NULL,
    rate double precision NOT NULL,
    comment character varying
);


ALTER TABLE public."Review" OWNER TO postgres;

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
-- Name: Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Trip" (
    trip_id integer NOT NULL,
    price double precision NOT NULL,
    date character varying NOT NULL,
    estimated_time double precision NOT NULL,
    d_ssn integer NOT NULL,
    source_station integer NOT NULL,
    destination_station integer NOT NULL
);


ALTER TABLE public."Trip" OWNER TO postgres;

--
-- Name: Vacation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vacation" (
    m_ssn integer NOT NULL,
    d_ssn integer NOT NULL,
    date date NOT NULL,
    status boolean DEFAULT false
);


ALTER TABLE public."Vacation" OWNER TO postgres;

--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (ssn, email, fname, mname, lname, password) FROM stdin;
12341234	karimfarid@gmail.com	Karim	M	Farid	$2b$10$Ml8IV2WHxoDNTcqmz7rjeu2iJWgQ0KhsrByceKRtRrHj0V0N.DRym
1234	abc@gmail.com	Karim	Farid	Zakzouk	$2b$10$ryDDev7xZ9o1K6RqJR.dUeDcOUl7hMIztcCLeSERvq5QcFKA4aXCe
\.


--
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attendance" (d_ssn, date, arrival_time, leave_time) FROM stdin;
\.


--
-- Data for Name: Car; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Car" (car_license, number_of_seats, air_conditioning, car_type, additional_price, d_ssn) FROM stdin;
u53jf3g2	13	f	Toyota	15.5	53290520
\.


--
-- Data for Name: Driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Driver" (ssn, email, fname, mname, lname, password, is_private, m_ssn, "Shift", "Salary", "Station_ID") FROM stdin;
53290520	example786@gmail.com	Mohammed	Ramy	Abozaid	$2b$10$55UbQOUBHUO36nZoh0UQNud3SuA2wipKw.KTQwbNl27Om74J2x/6q	f	1	\N	696969	\N
253850923	example135@gmail.com	Abdullah	Ahmed	Elnoory	$2b$10$FnvbQQ/MCCs2y8nTSBADuux6mg8..Hjq0JKoBiDXQEa0FefkkYIsm	f	1	9 - 6	696969	1
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
123	asd@gmail.com	asd	aasd	asd	$2b$10$UjcLBKZoA7bw6LTZrLsRfe2JAlqdAamvJ6EMa7isgnaVK4CuZcrBu	\N
3257932	example412@gmail.com	fulan	ellan	elfulany	$2b$10$UjcLBKZoA7bw6LTZrLsRfe2JAlqdAamvJ6EMa7isgnaVK4CuZcrBu	12341234
\.


--
-- Data for Name: Manager Finance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Manager Finance" (m_ssn, date, salary, total_profit) FROM stdin;
\.


--
-- Data for Name: Passenger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Passenger" (id, email, age, fname, lname, password) FROM stdin;
593580643	example553@gmail.com	20	Hamdy	Elsharqawy	$2b$10$Vo9nu8NAWmh5Mt8W7lALeO703OcVNK.xX.j441PdKYIYhlo8tktJW
\.


--
-- Data for Name: Private Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Private Trip" (order_id, source, destination, price, estimated_time, data, d_ssn, p_id) FROM stdin;
1	ggg	eee	12.1	1.1	1aasd	53290520	593580643
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (p_id, t_id, rate, comment) FROM stdin;
\.


--
-- Data for Name: Station; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Station" (station_id, station_name, street, zipcode, governorate, m_ssn) FROM stdin;
1	Giza	giza street\n	1234	Cario	1
2	6October\n	Mehwar	4321	Giza	2
\.


--
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Trip" (trip_id, price, date, estimated_time, d_ssn, source_station, destination_station) FROM stdin;
1	69.69	2024	100	53290520	1	2
2	69.69	2024	100	53290520	1	2
\.


--
-- Data for Name: Vacation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vacation" (m_ssn, d_ssn, date, status) FROM stdin;
\.


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
-- Name: Passenger Passenger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passenger"
    ADD CONSTRAINT "Passenger_pkey" PRIMARY KEY (id);


--
-- Name: Private Trip PrivateTrip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Private Trip"
    ADD CONSTRAINT "PrivateTrip_pkey" PRIMARY KEY (order_id);


--
-- Name: Station Station_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY (station_id);


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
-- Name: Review pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT pkey PRIMARY KEY (p_id, t_id);


--
-- Name: Trip trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_pkey PRIMARY KEY (trip_id);


--
-- Name: Attendance Attendance_D_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_D_SSN_fkey" FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) NOT VALID;


--
-- Name: Car D_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "D_SSN_fkey" FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) NOT VALID;


--
-- Name: Lost & Found Lost & Found_T_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lost & Found"
    ADD CONSTRAINT "Lost & Found_T_ID_fkey" FOREIGN KEY (t_id) REFERENCES public."Trip"(trip_id);


--
-- Name: Station MSSN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "MSSN" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) ON UPDATE CASCADE NOT VALID;


--
-- Name: Manager Finance Manager Finance_M_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager Finance"
    ADD CONSTRAINT "Manager Finance_M_SSN_fkey" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) NOT VALID;


--
-- Name: Manager Manager_verifiedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT "Manager_verifiedBy_fkey" FOREIGN KEY (verified_by) REFERENCES public."Admin"(ssn) NOT VALID;


--
-- Name: Driver S_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "S_ID_fkey" FOREIGN KEY ("Station_ID") REFERENCES public."Station"(station_id) NOT VALID;


--
-- Name: Vacation Vacation_D_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vacation"
    ADD CONSTRAINT "Vacation_D_SSN_fkey" FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) NOT VALID;


--
-- Name: Vacation Vacation_M_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vacation"
    ADD CONSTRAINT "Vacation_M_SSN_fkey" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) NOT VALID;


--
-- Name: Private Trip d_ssn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Private Trip"
    ADD CONSTRAINT d_ssn_fkey FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: Driver fkey_MSSN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "fkey_MSSN" FOREIGN KEY (m_ssn) REFERENCES public."Manager"(ssn) NOT VALID;


--
-- Name: Private Trip p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Private Trip"
    ADD CONSTRAINT p_id_fkey FOREIGN KEY (p_id) REFERENCES public."Passenger"(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: Review p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT p_id_fkey FOREIGN KEY (p_id) REFERENCES public."Passenger"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review t_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT t_id_fkey FOREIGN KEY (t_id) REFERENCES public."Trip"(trip_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Trip trip_d_ssn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_d_ssn_fkey FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: Trip trip_destination_station_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_destination_station_fkey FOREIGN KEY (destination_station) REFERENCES public."Station"(station_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: Trip trip_source_station_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_source_station_fkey FOREIGN KEY (source_station) REFERENCES public."Station"(station_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- PostgreSQL database dump complete
--

