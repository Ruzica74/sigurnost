# Sigurnost

### Zadatak

Implementirati DMS (Document Management System) - sistem za upravljanje 
dokumentima. Svi dokumenti treba da se nalaze na centralnom repozitorijumu. 
Korisnici sistema se dijele u tri grupe: Administrator sistema, Administrator 
dokumenata i Klijent. 
Sistem se sastoji od dvije web aplikacije: Korisnici i Dokumenti. Aplikaciji Korisnici 
može da pristupi samo administrator sistema i u okviru ove aplikacije se:  
&nbsp;&nbsp;&nbsp;&nbsp;• upravlja korisničkim nalozima (CRUD),  
&nbsp;&nbsp;&nbsp;&nbsp;• za korisnika (Klijent) određuje njegov korijenski direktorijum (korisnik u  
aplikaciji Dokumenti vidi sadržaj svog korijenskog direktorijuma, kao i sadržaj  
svih poddirektorijuma),  
&nbsp;&nbsp;&nbsp;&nbsp;• za korisnika (Klijent) podešava sa kojeg domena/IP adrese može da pristupi  
aplikaciji Dokumenti, kao i skup akcija koje može da vrši nad dokumentima  
(CRUD),  
&nbsp;&nbsp;&nbsp;&nbsp;• za korisnika (Administrator dokumenata) određuje njegov korijenski  
direktorijum čiji sadržaj će da administrira.  
Aplikaciji Dokumenti mogu da pristupe sve grupe korisnika i u okviru ove aplikacije: 
&nbsp;&nbsp;&nbsp;&nbsp;• korisnik (Klijent) u okviru svog stabla direktorijuma (u zavisnosti od privilegija) 
može da preuzima postojeće dokumente, upload-uje nove, mijenja postojeće  
dokumente (lokalno), vrši upload izmijenjene verzije dokumenta i briše  
dokumente,  
&nbsp;&nbsp;&nbsp;&nbsp;• korisnik (Administrator dokumenata) u okviru svog stabla direktorijuma može  
da kreira i briše direktorijume, premiješta dokumente iz jednog direktorijuma  
u drugi i sprovodi sve akcije koje može da vrši korisnička grupa Klijent,  
&nbsp;&nbsp;&nbsp;&nbsp;• korisnik (Administrator sistema) može da pregleda kompletan repozitorijum i  
da preuzima pojedine dokumente, kao i da vidi istoriju korisničkih akcija  
(vrijeme akcije, tip akcije, korisničko ime korisnika, naziv dokumenta i sl).  
Korisnici se prijavljuju na sistem pomoću dvo-faktorske autentikacije. U prvom  
koraku potrebno je unijeti korisničko ime i lozinku, dok je u drugom potrebno unijeti  
jedinstveni token koji za korisnika generiše mobilna aplikacija. Sinhronizaciju između  
mobilne aplikacije i DMS sistema implementirati na proizvoljan način. Pored toga, potrebno  
je implementirati Single Sign On (SSO) mehanizam, tako da korisnici, koji imaju pristup  
objema aplikacijama, mogu da se autentikuju u bilo kojoj aplikaciji i da imaju pristup čitavom  
sistemu. Osim navedenog, omogućiti prijavu na aplikaciju Dokumenti pomoću OAuth2  
framework-a, pri čemu se za prijavu u tom slučaju koristi eksterni nalog (Google, GitHub i sl).  
Sistem je potrebno implementirati tako da sva komunikacija bude zaštićena i da se  
postigne visok stepen zaštite od većine poznatih napada na web aplikacije, kao što su SQL  
Injection, XSS, Session Hijacking, DoS napadi i sl. Pored toga, potrebno je implementirati  
pravilno rukovanje greškama, tako da sistem-specifične informacije ne budu vidljive  
krajnjem korisniku.  
Sistem treba da ima i mogućnost nadzora svih direktorijuma i datoteka, te da šalje  
informaciju o svakom brisanju direktorijuma i datoteka Administratoru sistema.  
