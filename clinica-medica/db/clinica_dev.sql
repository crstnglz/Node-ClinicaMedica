--
-- PostgreSQL database dump
--

\restrict Bk3UpwofLPgguTWadZ6h7FfACNdujzBUSrrswucnT3MX3DBcu2ogTuSh1JK5E47

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.11 (Homebrew)

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

--
-- Name: enum_citas_estado; Type: TYPE; Schema: public; Owner: cristina
--

CREATE TYPE public.enum_citas_estado AS ENUM (
    'pendiente',
    'en_curso',
    'finalizada',
    'cancelada'
);


ALTER TYPE public.enum_citas_estado OWNER TO cristina;

--
-- Name: enum_usuarios_rol; Type: TYPE; Schema: public; Owner: cristina
--

CREATE TYPE public.enum_usuarios_rol AS ENUM (
    'admin',
    'medico',
    'recepcionista'
);


ALTER TYPE public.enum_usuarios_rol OWNER TO cristina;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: cristina
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO cristina;

--
-- Name: citas; Type: TABLE; Schema: public; Owner: cristina
--

CREATE TABLE public.citas (
    id integer NOT NULL,
    id_paciente integer NOT NULL,
    id_medico integer NOT NULL,
    fecha date NOT NULL,
    hora time without time zone NOT NULL,
    duracion_min integer DEFAULT 30,
    estado public.enum_citas_estado DEFAULT 'pendiente'::public.enum_citas_estado,
    motivo character varying(255)
);


ALTER TABLE public.citas OWNER TO cristina;

--
-- Name: citas_id_seq; Type: SEQUENCE; Schema: public; Owner: cristina
--

CREATE SEQUENCE public.citas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.citas_id_seq OWNER TO cristina;

--
-- Name: citas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cristina
--

ALTER SEQUENCE public.citas_id_seq OWNED BY public.citas.id;


--
-- Name: pacientes; Type: TABLE; Schema: public; Owner: cristina
--

CREATE TABLE public.pacientes (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    dni character varying(255) NOT NULL,
    fecha_nacimiento date,
    telefono character varying(255),
    email character varying(255),
    activo boolean DEFAULT true
);


ALTER TABLE public.pacientes OWNER TO cristina;

--
-- Name: pacientes_id_seq; Type: SEQUENCE; Schema: public; Owner: cristina
--

CREATE SEQUENCE public.pacientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pacientes_id_seq OWNER TO cristina;

--
-- Name: pacientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cristina
--

ALTER SEQUENCE public.pacientes_id_seq OWNED BY public.pacientes.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: cristina
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(255),
    email character varying(255),
    password character varying(255),
    rol public.enum_usuarios_rol,
    especialidad character varying(255)
);


ALTER TABLE public.usuarios OWNER TO cristina;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: cristina
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO cristina;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cristina
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: citas id; Type: DEFAULT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.citas ALTER COLUMN id SET DEFAULT nextval('public.citas_id_seq'::regclass);


--
-- Name: pacientes id; Type: DEFAULT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.pacientes ALTER COLUMN id SET DEFAULT nextval('public.pacientes_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: cristina
--

COPY public."SequelizeMeta" (name) FROM stdin;
20260418111431-crear-pacientes.cjs
20260418111431-crear-usuarios.cjs
20260418111432-crear-citas.cjs
\.


--
-- Data for Name: citas; Type: TABLE DATA; Schema: public; Owner: cristina
--

COPY public.citas (id, id_paciente, id_medico, fecha, hora, duracion_min, estado, motivo) FROM stdin;
3	3	2	2026-04-30	11:00:00	30	finalizada	Control tensión
4	4	2	2026-04-30	12:00:00	60	cancelada	Revisión analítica
5	1	1	2026-05-08	22:31:00	30	pendiente	me duele la cabeza
1	1	1	2026-04-30	09:00:00	30	cancelada	Revisión general
6	12	2	2026-05-05	01:43:00	30	cancelada	no lo se
2	2	1	2026-04-30	10:00:00	45	finalizada	Consulta dolor de cabeza
\.


--
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: cristina
--

COPY public.pacientes (id, nombre, apellidos, dni, fecha_nacimiento, telefono, email, activo) FROM stdin;
1	Pedro	Valenzuela Urrutia	QDDJLLM8W	1988-12-01	910.365.031	Jesus49@hotmail.com	t
2	Santiago	Véliz Tirado	DPM4MB63X	1948-07-27	952.946.575	Anni81@yahoo.com	t
3	Adriana	Mena Escobedo	COJ0W8UTB	1983-03-24	906-960-902	Andres_BurgosZaragoza@hotmail.com	t
4	Jesús	Bravo Montalvo	XQ0RNZAIY	1994-12-08	910786714	Concepcion.MataMolina@hotmail.com	t
5	María Eugenia	Leal Estévez	YTOPZSC8O	1981-09-25	946.587.795	Jaime64@hotmail.com	t
6	Alfonso	Pabón Elizondo	JFVO5OX5M	1964-07-02	949-992-855	Gabriela_SerranoDelatorre24@hotmail.com	t
7	Lorena	Valadez Castañeda	BUWCK5TMA	1993-01-03	930911942	Carlos62@gmail.com	t
8	Ángel	Leiva Perea	NR0HTUNQL	1983-05-15	963 596 861	Elsa_AdameMendez64@gmail.com	t
9	Roberto	Rosario Armenta	BXJS1NBHP	1948-06-20	924809211	Francisco_AvalosEnriquez94@yahoo.com	t
10	José	Martínez Barreto	X4L27V9QS	1948-08-15	978.932.965	Luisa12@yahoo.com	t
11	Pablo	Uribe Montalvo	KJDB6PV8P	1954-05-29	907.094.232	Miguel60@gmail.com	t
12	Anita	Haro Luevano	KQMRRNOPH	1987-03-16	959-586-335	JoseLuis.MendozaGrijalva37@gmail.com	t
13	Juan Carlos	Tapia Reyes	FHYWP4ISA	1961-01-05	992-902-729	Maria_VillegasCorrales@gmail.com	t
14	Manuela	Lucio Caraballo	RMTJRPYG6	1960-01-02	950 166 220	Ariadna_QuezadaVeliz4@yahoo.com	t
15	Elvira	Rael Valenzuela	C8XW3GUGD	1984-09-15	980703873	Angel21@hotmail.com	t
16	Inés	Ornelas Lozada	UAWOG8AS1	1988-01-29	963238492	Miguel_UrrutiaGodinez@yahoo.com	t
17	Ana María	Ramírez Salgado	IZDBRRVL4	2002-02-13	975-740-465	Jose_BorregoCollado85@yahoo.com	t
18	Raúl	Camarillo Haro	DB3N3QWQI	1954-12-01	903040588	Alfonso.ValladaresBenitez42@gmail.com	t
19	Iván	Valencia Lomeli	LJ6FHDXD6	1990-07-22	936.927.990	Armando85@yahoo.com	t
20	Elisa	Lozano Jiménez	ZUPIB16PA	1976-04-27	998.782.449	David_RinconMagana26@yahoo.com	t
21	Cristina	González	12345678C	2000-12-05	666111222	cristina@paciente.com	t
22	Iván	Meraz Mendoza	Y8F5D5GPV	1949-09-01	915.380.418	MariaTeresa71@hotmail.com	t
23	Octavio	Carrillo Espinosa de los Monteros	CF6OJB0NK	1981-05-01	986 594 037	Francisca.BandaTerrazas@hotmail.com	t
24	Diego	Sevilla Longoria	S0CSFQ7QX	1961-06-17	938171749	Josep_CaraballoAlmaraz23@gmail.com	t
25	Matilde	Alonso Crespo	XQ651C6D0	1980-10-01	931-943-596	Sonia_ArellanoGonzalez@gmail.com	t
26	Nicolás	Ramírez Acevedo	FSWEMEDZ0	1992-08-28	938.778.027	Mario.CovarrubiasApodaca@hotmail.com	t
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: cristina
--

COPY public.usuarios (id, nombre, email, password, rol, especialidad) FROM stdin;
1	Mercedes Saldaña Saucedo	Laura3@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Director de División Heredado
2	Isabel Delatorre Polanco	Roberto.MataVaca11@hotmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Director de Mercados Gerente
3	Diana Aparicio Rangel	MarcoAntonio_MenchacaAnguiano1@hotmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Analista de Investigación Cliente
4	María Elena Huerta Rascón	Joaquin76@hotmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Oficial de Implementación Nacional
5	Antonia Osorio Ferrer	MariadelCarmen.ValdezArmenta54@hotmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Productor de Operaciones Central
6	Esperanza Nava Ferrer	Jose_CarreraCarrera@gmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Productor de Aplicaciones Gerente
7	Eduardo Arevalo Solís	Josep_GallardoCasas46@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Asistente de Creativo Humano
8	Josefina Rosales Valdivia	Gloria.QuesadaCervantes84@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Analista de Implementación Nacional
9	Ignacio Dueñas Casillas	Jesus31@hotmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Asociado de Marca Interno
10	María Elena Hernández Argüello	Roser_PosadaAdame@gmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Asociado de Seguro Heredado
11	Jesús Ocampo Caraballo	Veronica_PuentePina@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Gerente de Métricas Dinánmico
12	Octavio Gaitán León	Gilberto_CamachoSalas74@gmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Agente de Funcionalidad Interno
13	Reina Soliz Gámez	Roberto_SerranoTijerina@hotmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Administrador de Mobilidad Interno
14	Vicente Guevara Villarreal	JorgeLuis72@gmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Asociado de Mercados Corporativo
15	Agustín Jáquez Mejía	JoseEduardo75@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Director de Seguridada Central
16	Sra. Elisa Arce Cervántez	Isabel_ArenasEspinoza@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Ingeniero de Identidad Inversor
17	Sonia Amaya Carreón	Mateo60@gmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Consultor de Creativo Distrito
18	Ángel León Gálvez	Jennifer.AlvaradoBrito@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Ejecutivo de Implementación Jefe
19	Catalina Arias Serrano	Javier89@yahoo.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	recepcionista	Estratega de Investigación Corporativo
20	Elena Coronado Verdugo	Ester.BotelloDuarte@gmail.com	$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK	medico	Gerente de Mercados Director
21	Admin	admin@clinica.com	$2b$10$tjY1Y/S28zGPmOLMraUL1uwbDKWaHvXQzzRQlUnJsFcnC1.sKiXLO	admin	\N
22	Cristina	cristina@clinica.com	$2b$10$YVxgUe6tbmA53BJ0zEBRWeHMpAnvhmB7.ayfyNV9y/WZMpdyccToG	medico	Cirugía Plástica
\.


--
-- Name: citas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cristina
--

SELECT pg_catalog.setval('public.citas_id_seq', 6, true);


--
-- Name: pacientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cristina
--

SELECT pg_catalog.setval('public.pacientes_id_seq', 26, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cristina
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 22, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: citas citas_pkey; Type: CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id);


--
-- Name: pacientes pacientes_dni_key; Type: CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_dni_key UNIQUE (dni);


--
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: citas citas_id_medico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.usuarios(id);


--
-- Name: citas citas_id_paciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cristina
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Bk3UpwofLPgguTWadZ6h7FfACNdujzBUSrrswucnT3MX3DBcu2ogTuSh1JK5E47

