--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 12.5

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

DROP DATABASE IF EXISTS perndata;
--
-- Name: perndata; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE perndata WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE perndata OWNER TO postgres;

\connect perndata

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
-- Name: pern_init; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pern_init (
    test character varying
);


ALTER TABLE public.pern_init OWNER TO postgres;

--
-- Data for Name: pern_init; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pern_init (test) FROM stdin;
pern_db_response
\.


--
-- PostgreSQL database dump complete
--

