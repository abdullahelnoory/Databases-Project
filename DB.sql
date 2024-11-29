PGDMP      2             
    |         
   SwiftRoute    17.2    17.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16388 
   SwiftRoute    DATABASE     �   CREATE DATABASE "SwiftRoute" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Arabic_Saudi Arabia.1256';
    DROP DATABASE "SwiftRoute";
                     postgres    false            �            1259    16403    Admin    TABLE     �   CREATE TABLE public."Admin" (
    ssn integer NOT NULL,
    email character varying NOT NULL,
    fname character varying NOT NULL,
    mname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public."Admin";
       public         heap r       postgres    false            �            1259    16455    Car    TABLE       CREATE TABLE public."Car" (
    "CarLicense" character varying NOT NULL,
    "NumberOfSeats" integer NOT NULL,
    "AirConditioning" boolean DEFAULT false NOT NULL,
    "CarType" character varying NOT NULL,
    "AdditionalPrice" integer,
    "D_SSN" integer NOT NULL
);
    DROP TABLE public."Car";
       public         heap r       postgres    false            �            1259    16421    Driver    TABLE     y  CREATE TABLE public."Driver" (
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
    DROP TABLE public."Driver";
       public         heap r       postgres    false            �            1259    16412    Manager    TABLE     �   CREATE TABLE public."Manager" (
    ssn integer NOT NULL,
    email character varying NOT NULL,
    fname character varying NOT NULL,
    mname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public."Manager";
       public         heap r       postgres    false            �            1259    16448 	   Passenger    TABLE     �   CREATE TABLE public."Passenger" (
    id integer NOT NULL,
    email character varying NOT NULL,
    age integer NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public."Passenger";
       public         heap r       postgres    false            �            1259    16435    Station    TABLE     �   CREATE TABLE public."Station" (
    "StationID" integer NOT NULL,
    "StationName" character varying NOT NULL,
    "Street" character varying NOT NULL,
    "ZipCode" character varying NOT NULL,
    "Governorate" character varying NOT NULL
);
    DROP TABLE public."Station";
       public         heap r       postgres    false                      0    16403    Admin 
   TABLE DATA           L   COPY public."Admin" (ssn, email, fname, mname, lname, password) FROM stdin;
    public               postgres    false    217   y"                 0    16455    Car 
   TABLE DATA           x   COPY public."Car" ("CarLicense", "NumberOfSeats", "AirConditioning", "CarType", "AdditionalPrice", "D_SSN") FROM stdin;
    public               postgres    false    222   �"                 0    16421    Driver 
   TABLE DATA           {   COPY public."Driver" (ssn, email, fname, mname, lname, password, isprivate, "MSSN", "Shift", "Salary", "S_ID") FROM stdin;
    public               postgres    false    219   �"                 0    16412    Manager 
   TABLE DATA           N   COPY public."Manager" (ssn, email, fname, mname, lname, password) FROM stdin;
    public               postgres    false    218   I#                 0    16448 	   Passenger 
   TABLE DATA           M   COPY public."Passenger" (id, email, age, fname, lname, password) FROM stdin;
    public               postgres    false    221   f#                 0    16435    Station 
   TABLE DATA           c   COPY public."Station" ("StationID", "StationName", "Street", "ZipCode", "Governorate") FROM stdin;
    public               postgres    false    220   �#       |           2606    16462    Car Car_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("CarLicense");
 :   ALTER TABLE ONLY public."Car" DROP CONSTRAINT "Car_pkey";
       public                 postgres    false    222            z           2606    16454    Passenger Passenger_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Passenger"
    ADD CONSTRAINT "Passenger_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Passenger" DROP CONSTRAINT "Passenger_pkey";
       public                 postgres    false    221            x           2606    16441    Station Station_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY ("StationID");
 B   ALTER TABLE ONLY public."Station" DROP CONSTRAINT "Station_pkey";
       public                 postgres    false    220            l           2606    16411    Admin admin_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT admin_email_key;
       public                 postgres    false    217            n           2606    16409    Admin admin_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_pkey PRIMARY KEY (ssn);
 <   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT admin_pkey;
       public                 postgres    false    217            t           2606    16429    Driver driver_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT driver_email_key;
       public                 postgres    false    219            v           2606    16427    Driver driver_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_pkey PRIMARY KEY (ssn);
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT driver_pkey;
       public                 postgres    false    219            p           2606    16420    Manager manager_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public."Manager" DROP CONSTRAINT manager_email_key;
       public                 postgres    false    218            r           2606    16418    Manager manager_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_pkey PRIMARY KEY (ssn);
 @   ALTER TABLE ONLY public."Manager" DROP CONSTRAINT manager_pkey;
       public                 postgres    false    218                       2606    16463    Car D_SSN_fkey    FK CONSTRAINT        ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "D_SSN_fkey" FOREIGN KEY ("D_SSN") REFERENCES public."Driver"(ssn) NOT VALID;
 <   ALTER TABLE ONLY public."Car" DROP CONSTRAINT "D_SSN_fkey";
       public               postgres    false    219    4726    222            }           2606    16468    Driver S_ID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "S_ID_fkey" FOREIGN KEY ("S_ID") REFERENCES public."Station"("StationID") NOT VALID;
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT "S_ID_fkey";
       public               postgres    false    4728    219    220            ~           2606    16430    Driver fkey_MSSN    FK CONSTRAINT     �   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "fkey_MSSN" FOREIGN KEY ("MSSN") REFERENCES public."Manager"(ssn) NOT VALID;
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT "fkey_MSSN";
       public               postgres    false    218    4722    219                  x������ � �            x������ � �         �   x�325�05�42�L�H�-�I546uH�M���K���tLJ)��I��t��MM�t����/��T1JR14Pq�+K
��uv.6���	vrt)-�0�M�����*4���w�t�tM4pKM�Ύ�,��L��#�=... �(            x������ � �         }   x�3�46�0031�L�H�-�I555vH�M���K���42��H�M��t�)�H,*L,��T1JR14P	˷�+��s��0�-�7�q�I�770�O��֫���211H����ɷ(�.�
����� �"�            x������ � �     