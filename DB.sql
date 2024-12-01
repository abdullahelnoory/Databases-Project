PGDMP  :    #                |         
   SwiftRoute    17.2    17.2 '    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            /           1262    16388 
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
       public         heap r       postgres    false            �            1259    16455    Car    TABLE       CREATE TABLE public."Car" (
    "CarLicense" character varying NOT NULL,
    "NumberOfSeats" integer NOT NULL,
    "AirConditioning" boolean DEFAULT false NOT NULL,
    "CarType" character varying NOT NULL,
    "AdditionalPrice" double precision,
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
       public         heap r       postgres    false            �            1259    24653    PrivateTrip    TABLE     M  CREATE TABLE public."PrivateTrip" (
    "orderID" integer NOT NULL,
    source character varying NOT NULL,
    destination character varying NOT NULL,
    price double precision NOT NULL,
    "estimatedTime" double precision NOT NULL,
    data character varying NOT NULL,
    "D_SSN" integer NOT NULL,
    "P_ID" integer NOT NULL
);
 !   DROP TABLE public."PrivateTrip";
       public         heap r       postgres    false            �            1259    16435    Station    TABLE     �   CREATE TABLE public."Station" (
    "StationID" integer NOT NULL,
    "StationName" character varying NOT NULL,
    "Street" character varying NOT NULL,
    "ZipCode" character varying NOT NULL,
    "Governorate" character varying NOT NULL
);
    DROP TABLE public."Station";
       public         heap r       postgres    false            �            1259    24625    Trip    TABLE        CREATE TABLE public."Trip" (
    tripid integer NOT NULL,
    price double precision NOT NULL,
    date character varying NOT NULL,
    estimatedtime double precision NOT NULL,
    d_ssn integer NOT NULL,
    "sourceStation" integer NOT NULL,
    "destinationStation" integer NOT NULL
);
    DROP TABLE public."Trip";
       public         heap r       postgres    false            "          0    16403    Admin 
   TABLE DATA           L   COPY public."Admin" (ssn, email, fname, mname, lname, password) FROM stdin;
    public               postgres    false    217   l2       '          0    16455    Car 
   TABLE DATA           x   COPY public."Car" ("CarLicense", "NumberOfSeats", "AirConditioning", "CarType", "AdditionalPrice", "D_SSN") FROM stdin;
    public               postgres    false    222   �2       $          0    16421    Driver 
   TABLE DATA           {   COPY public."Driver" (ssn, email, fname, mname, lname, password, isprivate, "MSSN", "Shift", "Salary", "S_ID") FROM stdin;
    public               postgres    false    219   �2       #          0    16412    Manager 
   TABLE DATA           N   COPY public."Manager" (ssn, email, fname, mname, lname, password) FROM stdin;
    public               postgres    false    218   �3       &          0    16448 	   Passenger 
   TABLE DATA           M   COPY public."Passenger" (id, email, age, fname, lname, password) FROM stdin;
    public               postgres    false    221   �3       )          0    24653    PrivateTrip 
   TABLE DATA           v   COPY public."PrivateTrip" ("orderID", source, destination, price, "estimatedTime", data, "D_SSN", "P_ID") FROM stdin;
    public               postgres    false    224   W4       %          0    16435    Station 
   TABLE DATA           c   COPY public."Station" ("StationID", "StationName", "Street", "ZipCode", "Governorate") FROM stdin;
    public               postgres    false    220   t4       (          0    24625    Trip 
   TABLE DATA           r   COPY public."Trip" (tripid, price, date, estimatedtime, d_ssn, "sourceStation", "destinationStation") FROM stdin;
    public               postgres    false    223   �4       �           2606    16462    Car Car_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("CarLicense");
 :   ALTER TABLE ONLY public."Car" DROP CONSTRAINT "Car_pkey";
       public                 postgres    false    222            �           2606    16454    Passenger Passenger_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Passenger"
    ADD CONSTRAINT "Passenger_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Passenger" DROP CONSTRAINT "Passenger_pkey";
       public                 postgres    false    221            �           2606    24659    PrivateTrip PrivateTrip_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."PrivateTrip"
    ADD CONSTRAINT "PrivateTrip_pkey" PRIMARY KEY ("orderID");
 J   ALTER TABLE ONLY public."PrivateTrip" DROP CONSTRAINT "PrivateTrip_pkey";
       public                 postgres    false    224            �           2606    16441    Station Station_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY ("StationID");
 B   ALTER TABLE ONLY public."Station" DROP CONSTRAINT "Station_pkey";
       public                 postgres    false    220            t           2606    16411    Admin admin_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT admin_email_key;
       public                 postgres    false    217            v           2606    16409    Admin admin_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT admin_pkey PRIMARY KEY (ssn);
 <   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT admin_pkey;
       public                 postgres    false    217            |           2606    16429    Driver driver_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT driver_email_key;
       public                 postgres    false    219            ~           2606    16427    Driver driver_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT driver_pkey PRIMARY KEY (ssn);
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT driver_pkey;
       public                 postgres    false    219            x           2606    16420    Manager manager_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public."Manager" DROP CONSTRAINT manager_email_key;
       public                 postgres    false    218            z           2606    16418    Manager manager_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT manager_pkey PRIMARY KEY (ssn);
 @   ALTER TABLE ONLY public."Manager" DROP CONSTRAINT manager_pkey;
       public                 postgres    false    218            �           2606    24631    Trip trip_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_pkey PRIMARY KEY (tripid);
 :   ALTER TABLE ONLY public."Trip" DROP CONSTRAINT trip_pkey;
       public                 postgres    false    223            �           2606    16463    Car D_SSN_fkey    FK CONSTRAINT        ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "D_SSN_fkey" FOREIGN KEY ("D_SSN") REFERENCES public."Driver"(ssn) NOT VALID;
 <   ALTER TABLE ONLY public."Car" DROP CONSTRAINT "D_SSN_fkey";
       public               postgres    false    219    4734    222            �           2606    16468    Driver S_ID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "S_ID_fkey" FOREIGN KEY ("S_ID") REFERENCES public."Station"("StationID") NOT VALID;
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT "S_ID_fkey";
       public               postgres    false    4736    220    219            �           2606    16430    Driver fkey_MSSN    FK CONSTRAINT     �   ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "fkey_MSSN" FOREIGN KEY ("MSSN") REFERENCES public."Manager"(ssn) NOT VALID;
 >   ALTER TABLE ONLY public."Driver" DROP CONSTRAINT "fkey_MSSN";
       public               postgres    false    4730    218    219            �           2606    24665    PrivateTrip fkey_P_ID    FK CONSTRAINT     �   ALTER TABLE ONLY public."PrivateTrip"
    ADD CONSTRAINT "fkey_P_ID" FOREIGN KEY ("P_ID") REFERENCES public."Passenger"(id) NOT VALID;
 C   ALTER TABLE ONLY public."PrivateTrip" DROP CONSTRAINT "fkey_P_ID";
       public               postgres    false    221    4738    224            �           2606    24660    PrivateTrip fkey_d_ssn    FK CONSTRAINT     �   ALTER TABLE ONLY public."PrivateTrip"
    ADD CONSTRAINT fkey_d_ssn FOREIGN KEY ("D_SSN") REFERENCES public."Driver"(ssn) NOT VALID;
 B   ALTER TABLE ONLY public."PrivateTrip" DROP CONSTRAINT fkey_d_ssn;
       public               postgres    false    219    224    4734            �           2606    24632    Trip trip_d_ssn_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_d_ssn_fkey FOREIGN KEY (d_ssn) REFERENCES public."Driver"(ssn);
 @   ALTER TABLE ONLY public."Trip" DROP CONSTRAINT trip_d_ssn_fkey;
       public               postgres    false    223    4734    219            �           2606    24642 !   Trip trip_destinationstation_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_destinationstation_fkey FOREIGN KEY ("destinationStation") REFERENCES public."Station"("StationID");
 M   ALTER TABLE ONLY public."Trip" DROP CONSTRAINT trip_destinationstation_fkey;
       public               postgres    false    223    220    4736            �           2606    24637    Trip trip_sourcestation_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT trip_sourcestation_fkey FOREIGN KEY ("sourceStation") REFERENCES public."Station"("StationID");
 H   ALTER TABLE ONLY public."Trip" DROP CONSTRAINT trip_sourcestation_fkey;
       public               postgres    false    223    220    4736            "      x������ � �      '   0   x�+55�J3N7�44�L�ɯ�/I�44�3�456�4052������ �u	      $   �   x�]�Oo�0��s��k}������D/�@a��:����.˒��{@�H�	pR�
/�s�xB��j�ĺtƨ��5V%���������1�퇖r��No0D�v��3�� O�˷+[�6if;9WlQ����ɑ��<�a���F�mk�?�����~����BZ�E�,r�/�f��\�7.����M��ә�0��a�(�����/�)N      #      x������ � �      &   }   x�3�46�0031�L�H�-�I555vH�M���K���42��H�M��t�)�H,*L,��T1JR14P	˷�+��s��0�-�7�q�I�770�O��֫���211H����ɷ(�.�
����� �"�      )      x������ � �      %      x������ � �      (      x������ � �     