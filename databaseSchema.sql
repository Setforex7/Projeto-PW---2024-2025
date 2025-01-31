PGDMP5postgres    17.2    17.2     )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            ,           1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE postgres;
                     postgres    false            -           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                        postgres    false    4908                        2615    16387    pgagent    SCHEMA        CREATE SCHEMA pgagent;
    DROP SCHEMA pgagent;
                     postgres    false            .           0    0    SCHEMA pgagent    COMMENT     6   COMMENT ON SCHEMA pgagent IS 'pgAgent system tables';
                        postgres    false    7                        3079    16388    pgagent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgagent WITH SCHEMA pgagent;
    DROP EXTENSION pgagent;
false7            /           0    0    EXTENSION pgagent    COMMENT     >   COMMENT ON EXTENSION pgagent IS 'A PostgreSQL job scheduler';
false2�125916559UtilizadorTABLE

CREATE TABLE public."Utilizador" (
    userid numeric NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    name text,
    brithdate date,
    admin boolean,
    balance double precision,
    iban numeric,
    phonenumber numeric(9,0)
);
     DROP TABLE public."Utilizador";
       public         heap r       postgres    false            K          0    16389    pga_jobagent 
   TABLE DATA           I   COPY pgagent.pga_jobagent (jagpid, jaglogintime, jagstation) FROM stdin;
    pgagent               postgres    false    223   m       L          0    16398    pga_jobclass 
   TABLE DATA           7   COPY pgagent.pga_jobclass (jclid, jclname) FROM stdin;
    pgagent               postgres    false    225   �       M          0    16408    pga_job 
   TABLE DATA           �   COPY pgagent.pga_job (jobid, jobjclid, jobname, jobdesc, jobhostagent, jobenabled, jobcreated, jobchanged, jobagentid, jobnextrun, joblastrun) FROM stdin;
    pgagent               postgres    false    227   �       O          0    16456    pga_schedule 
   TABLE DATA           �   COPY pgagent.pga_schedule (jscid, jscjobid, jscname, jscdesc, jscenabled, jscstart, jscend, jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths) FROM stdin;
    pgagent               postgres    false    231   �       P          0    16484 
   pga_exception 
   TABLE DATA           J   COPY pgagent.pga_exception (jexid, jexscid, jexdate, jextime) FROM stdin;
    pgagent               postgres    false    233          Q          0    16498 
   pga_joblog 
   TABLE DATA           X   COPY pgagent.pga_joblog (jlgid, jlgjobid, jlgstatus, jlgstart, jlgduration) FROM stdin;
    pgagent               postgres    false    235   1       N          0    16432    pga_jobstep 
   TABLE DATA           �   COPY pgagent.pga_jobstep (jstid, jstjobid, jstname, jstdesc, jstenabled, jstkind, jstcode, jstconnstr, jstdbname, jstonerror, jscnextrun) FROM stdin;
    pgagent               postgres    false    229   N       R          0    16514    pga_jobsteplog 
   TABLE DATA           |   COPY pgagent.pga_jobsteplog (jslid, jsljlgid, jsljstid, jslstatus, jslresult, jslstart, jslduration, jsloutput) FROM stdin;
    pgagent               postgres    false    237   k       &          0    16559 
   Utilizador 
   TABLE DATA           }   COPY public."Utilizador" (userid, email, username, password, name, brithdate, admin, balance, iban, phonenumber) FROM stdin;
    public               postgres    false    238   �       �           2606    16565    Utilizador Utilizador_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Utilizador"
    ADD CONSTRAINT "Utilizador_pkey" PRIMARY KEY (userid);
 H   ALTER TABLE ONLY public."Utilizador" DROP CONSTRAINT "Utilizador_pkey";
       public                 postgres    false    238            K   @   x��446�4202�50�54P0��2��24ֳ0263��5��tq
������3s1����� ?�v      L   
   x������ � �      M   
   x������ � �      O   
   x������ � �      P   
   x������ � �      Q   
   x������ � �      N   
   x������ � �      R   
   x������ � �      &   J   x�3�,I-.IuH�M���K�υ�9
����3%������@��8K8��������������!�E&p��qqq hQ �     