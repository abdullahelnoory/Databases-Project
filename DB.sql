PGDMP  3    2             
    |         
   SwiftRoute    17.2    17.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16388 
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
       public         heap r       postgres    false            �            1259    16421    Driver    TABLE     0  CREATE TABLE public."Driver" (
    ssn integer NOT NULL,
    email character varying NOT NULL,
    fname character varying NOT NULL,
    mname character varying NOT NULL,
    lname character varying NOT NULL,
    password character varying NOT NULL,
    isprivate boolean NOT NULL,
    "MSSN" integer
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
       public         heap r       postgres    false            �            1259    16435    Station    TABLE     �   CREATE TABLE public."Station" (
    "StationID" integer NOT NULL,
    "StationName" character varying NOT NULL,
    "Street" character varying NOT NULL,
    "ZipCode" character varying NOT NULL,
    "Governorate" character varying NOT NULL
);
    DROP TABLE public."Station";
       public         heap r       postgres    false                      0    16403    Admin 
   TABLE DATA           L   COPY public."Admin" (ssn, email, fname, mname, lname, password) FROM stdin;
    public               postgres    false    217   �                 0    16421    Driver 
   TABLE DATA           `   COPY public."Driver" (ssn, email, fname, mname, lname, password, isprivate, "MSSN") FROM stdin;
    public               postgres    false    219   �                 0    16412    Manager 
   TABLE DATA           N   COPY public."Manager" (ssn, email, fname, mname, lname, password) FROM stdin;
    public               postgres    false    218   �                 0    16435    Station 
   TABLE DATA           c   COPY public."Station" ("StationID", "StationName", "Street", "ZipCode", "Governorate") FROM stdin;
    public               postgres    false    220   �       o           2606    16441    Station Station_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY ("StationID");
 B   ALTER TABLE ONLY public."Station" DROP CONSTRAINT "Station_pkey";
       public                 postgres    false    220            c           2606    16411    Admin admin_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT admin_email_key;
       public                 postgres    false    217            e           2606    16409    Admin admin_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_pkey PRIMARY KEY (ssn);
 <   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT admin_pkey;
       public                 postgres    false    217            k           2606    16429    Driver driver_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT driver_email_key;
       public                 postgres    false    219            m           2606    16427    Driver driver_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_pkey PRIMARY KEY (ssn);
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT driver_pkey;
       public                 postgres    false    219            g           2606    16420    Manager manager_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public."Manager" DROP CONSTRAINT manager_email_key;
       public                 postgres    false    218            i           2606    16418    Manager manager_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_pkey PRIMARY KEY (ssn);
 @   ALTER TABLE ONLY public."Manager" DROP CONSTRAINT manager_pkey;
       public                 postgres    false    218            p           2606    16430    Driver fkey_MSSN    FK CONSTRAINT     �   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "fkey_MSSN" FOREIGN KEY ("MSSN") REFERENCES public."Manager"(ssn) NOT VALID;
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT "fkey_MSSN";
       public               postgres    false    218    219    4713                  x������ � �            x������ � �            x������ � �            x������ � �     