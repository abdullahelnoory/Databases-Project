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
-- Name: Car; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Car" (
    "CarLicense" character varying NOT NULL,
    "NumberOfSeats" integer NOT NULL,
    "AirConditioning" boolean DEFAULT false NOT NULL,
    "CarType" character varying NOT NULL,
    "AdditionalPrice" double precision,
    "D_SSN" integer NOT NULL
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
    isprivate boolean NOT NULL,
    "MSSN" integer,
    "Shift" character varying,
    "Salary" integer,
    "S_ID" integer
);


ALTER TABLE public."Driver" OWNER TO postgres;

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
    "verifiedBy" integer
);


ALTER TABLE public."Manager" OWNER TO postgres;

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
-- Name: PrivateTrip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PrivateTrip" (
    "orderID" integer NOT NULL,
    source character varying NOT NULL,
    destination character varying NOT NULL,
    price double precision NOT NULL,
    "estimatedTime" double precision NOT NULL,
    data character varying NOT NULL,
    "D_SSN" integer NOT NULL,
    "P_ID" integer NOT NULL
);


ALTER TABLE public."PrivateTrip" OWNER TO postgres;

--
-- Name: Station; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Station" (
    "StationID" integer NOT NULL,
    "StationName" character varying NOT NULL,
    "Street" character varying NOT NULL,
    "ZipCode" character varying NOT NULL,
    "Governorate" character varying NOT NULL,
    "MSSN" integer
);


ALTER TABLE public."Station" OWNER TO postgres;

--
-- Name: Trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Trip" (
    tripid integer NOT NULL,
    price double precision NOT NULL,
    date character varying NOT NULL,
    estimatedtime double precision NOT NULL,
    d_ssn integer NOT NULL,
    "sourceStation" integer NOT NULL,
    "destinationStation" integer NOT NULL
);


ALTER TABLE public."Trip" OWNER TO postgres;

--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (ssn, email, fname, mname, lname, password) FROM stdin;
12341234	karimfarid@gmail.com	Karim	M	Farid	$2b$10$Ml8IV2WHxoDNTcqmz7rjeu2iJWgQ0KhsrByceKRtRrHj0V0N.DRym
\.


--
-- Data for Name: Car; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Car" ("CarLicense", "NumberOfSeats", "AirConditioning", "CarType", "AdditionalPrice", "D_SSN") FROM stdin;
u53jf3g2	13	f	Toyota	15.5	53290520
\.


--
-- Data for Name: Driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Driver" (ssn, email, fname, mname, lname, password, isprivate, "MSSN", "Shift", "Salary", "S_ID") FROM stdin;
53290520	example786@gmail.com	Mohammed	Ramy	Abozaid	$2b$10$55UbQOUBHUO36nZoh0UQNud3SuA2wipKw.KTQwbNl27Om74J2x/6q	f	1	\N	696969	\N
253850923	example135@gmail.com	Abdullah	Ahmed	Elnoory	$2b$10$FnvbQQ/MCCs2y8nTSBADuux6mg8..Hjq0JKoBiDXQEa0FefkkYIsm	f	1	9 - 6	696969	1
\.


--
-- Data for Name: Manager; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Manager" (ssn, email, fname, mname, lname, password, "verifiedBy") FROM stdin;
1	karim@gmail.com	karim\n	z	farid	12341234	\N
2	farid@gmail.com	farid	z	ahem	12341234	\N
12341234	12341234@gmail.com	Karim	M	Farid	$2b$10$QZzvKVbSPqamJaHD6BbtVuk20JvPpH4MuwOacJMdW6SRP3YaIJsO2	\N
11223344	karimfarid2004@gmail.com	Karim	M	Farid	$2b$10$9cLO5Am23zVLYj3O0V.exuVs275ajgHUGx65p69HcAyKrQ9CgO.nG	\N
\.


--
-- Data for Name: Passenger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Passenger" (id, email, age, fname, lname, password) FROM stdin;
593580643	example553@gmail.com	20	Hamdy	Elsharqawy	$2b$10$Vo9nu8NAWmh5Mt8W7lALeO703OcVNK.xX.j441PdKYIYhlo8tktJW
\.


--
-- Data for Name: PrivateTrip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PrivateTrip" ("orderID", source, destination, price, "estimatedTime", data, "D_SSN", "P_ID") FROM stdin;
1	ggg	eee	12.1	1.1	1aasd	53290520	593580643
\.


--
-- Data for Name: Station; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Station" ("StationID", "StationName", "Street", "ZipCode", "Governorate", "MSSN") FROM stdin;
1	Giza	giza street\n	1234	Cario	1
2	6October\n	Mehwar	4321	Giza	2
\.


--
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Trip" (tripid, price, date, estimatedtime, d_ssn, "sourceStation", "destinationStation") FROM stdin;
1	69.69	2024	100	53290520	1	2
2	69.69	2024	100	53290520	1	2
\.


--
-- Name: Car Car_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("CarLicense");


--
-- Name: Passenger Passenger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Passenger"
    ADD CONSTRAINT "Passenger_pkey" PRIMARY KEY (id);


--
-- Name: PrivateTrip PrivateTrip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateTrip"
    ADD CONSTRAINT "PrivateTrip_pkey" PRIMARY KEY ("orderID");


--
-- Name: Station Station_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY ("StationID");


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
-- Name: Trip trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_pkey PRIMARY KEY (tripid);


--
-- Name: Car D_SSN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "D_SSN_fkey" FOREIGN KEY ("D_SSN") REFERENCES public."Driver"(ssn) NOT VALID;


--
-- Name: Station MSSN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "MSSN" FOREIGN KEY ("MSSN") REFERENCES public."Manager"(ssn) NOT VALID;


--
-- Name: Manager Manager_verifiedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT "Manager_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES public."Admin"(ssn) NOT VALID;


--
-- Name: Driver S_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "S_ID_fkey" FOREIGN KEY ("S_ID") REFERENCES public."Station"("StationID") NOT VALID;


--
-- Name: Driver fkey_MSSN; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "fkey_MSSN" FOREIGN KEY ("MSSN") REFERENCES public."Manager"(ssn) NOT VALID;


--
-- Name: PrivateTrip fkey_P_ID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateTrip"
    ADD CONSTRAINT "fkey_P_ID" FOREIGN KEY ("P_ID") REFERENCES public."Passenger"(id) NOT VALID;


--
-- Name: PrivateTrip fkey_d_ssn; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateTrip"
    ADD CONSTRAINT fkey_d_ssn FOREIGN KEY ("D_SSN") REFERENCES public."Driver"(ssn) NOT VALID;


--
-- Name: Trip trip_d_ssn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_d_ssn_fkey FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn);


--
-- Name: Trip trip_destinationstation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_destinationstation_fkey FOREIGN KEY ("destinationStation") REFERENCES public."Station"("StationID");


--
-- Name: Trip trip_sourcestation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_sourcestation_fkey FOREIGN KEY ("sourceStation") REFERENCES public."Station"("StationID");


--
-- PostgreSQL database dump complete
--

