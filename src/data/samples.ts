import { SampleResume } from '../types';

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'sample-software-engineer',
    name: 'Elena Rostova',
    email: 'elena.rostova@techmail.io',
    role: 'Staff Systems & Cloud Architect',
    experienceYears: 9,
    fileName: 'Elena_Rostova_Staff_Architect_Resume.txt',
    summary: 'Distributed systems architect with 9+ years experience designing high-throughput event meshes, Kubernetes platforms, and microservices.',
    highlights: [
      'Engineered multi-region event pipeline processing 1.4B messages/day with 99.995% availability',
      'Reduced cloud infrastructure compute costs by 34% through automated spot-fleet orchestration',
      'Proficient in Go, Rust, TypeScript, Kafka, Terraform, and AWS/GCP architecture'
    ],
    content: `ELENA ROSTOVA
Staff Systems & Cloud Architect
Email: elena.rostova@techmail.io | Phone: +1 (415) 882-9014
San Francisco, CA | GitHub: github.com/elena-systems | LinkedIn: linkedin.com/in/elena-rostova

PROFESSIONAL SUMMARY
High-impact Staff Systems Engineer with 9 years of track record in distributed infrastructure, microservices, and automation pipelines. Specialized in event-driven systems, fault tolerance, and developer platform reliability.

CORE COMPETENCIES
- Distributed Computing: Apache Kafka, RabbitMQ, gRPC, Redis, NATS
- Cloud & Containers: Kubernetes (EKS/GKE), Docker, Terraform, Helm, AWS, GCP
- Languages: Go, TypeScript, Rust, Python, SQL
- Observability: Prometheus, Grafana, OpenTelemetry, Datadog

PROFESSIONAL EXPERIENCE
Staff Cloud Infrastructure Architect | CloudMatrix Networks (2022 - Present)
- Architected resilient multi-region event mesh handling 1.4B events/day with 99.995% uptime SLA.
- Led migration of 180+ microservices to Kubernetes with zero downtime and automated blue-green rollouts.
- Spearheaded company-wide finOps initiative reducing annual AWS expenditure by $780,000 (34% reduction).

Senior Backend Engineer | Apex Automation Inc (2018 - 2022)
- Built enterprise workflow automation engines processing mission-critical webhooks with p99 latency <45ms.
- Scaled database layer using PostgreSQL read-replicas and distributed caching across 4 global regions.
- Mentored a squad of 8 engineers and introduced automated end-to-end integration testing.

EDUCATION
B.S. in Computer Science | University of California, Berkeley (2014 - 2018)
`
  },
  {
    id: 'sample-product-manager',
    name: 'Marcus Vance',
    email: 'marcus.vance@ventureflow.co',
    role: 'Principal Product Manager',
    experienceYears: 8,
    fileName: 'Marcus_Vance_Product_Leader_Resume.txt',
    summary: 'B2B SaaS product leader specializing in developer tools, workflow orchestration, and PLG growth engines.',
    highlights: [
      'Grew developer platform ARR from $4.2M to $18.5M in 26 months',
      'Increased 30-day user activation rate by 42% via redesigned onboarding funnel',
      'Led cross-functional team of 14 engineers, 3 designers, and product analysts'
    ],
    content: `MARCUS VANCE
Principal Product Manager — Developer Platforms
Email: marcus.vance@ventureflow.co | Phone: +1 (206) 419-7720
Seattle, WA | LinkedIn: linkedin.com/in/marcusvance-pm

EXECUTIVE SUMMARY
Product leader with 8 years building and scaling B2B Developer Tools and automation SaaS products. Recognized for uniting deep technical empathy with rigorous business metrics and user-driven discovery.

SKILLS & SPECIALTIES
Product Strategy, Growth Marketing, User Research, API-First Design, OKRs, SQL Analytics, A/B Experimentation, Agile Scrum, Figma.

EXPERIENCE
Principal Product Manager | FlowStream Technologies (2021 - Present)
- Owned roadmap for core automation workflow engine used by 120,000+ active developers globally.
- Grew annual recurring revenue (ARR) from $4.2M to $18.5M through enterprise tier expansion.
- Redesigned webhook trigger setup, reducing developer time-to-first-event from 38 minutes to 4.2 minutes.

Senior Product Manager | DataPulse SaaS (2017 - 2021)
- Directed product lifecycle for real-time telemetry dashboards; launched 14 major feature releases.
- Ran 28 multivariate experiments boosting user activation from 21% to 63%.
- Partnered with enterprise sales to close 18 Fortune 500 contracts worth $6.1M in ACV.

EDUCATION & CERTIFICATIONS
B.A. in Economics & Informatics | University of Washington
Reforge Growth Series & Advanced Product Management
`
  },
  {
    id: 'sample-ai-engineer',
    name: 'Amina Al-Mansoor',
    email: 'amina.almansoor@neurallabs.ai',
    role: 'Lead AI & LLM Systems Engineer',
    experienceYears: 6,
    fileName: 'Amina_AlMansoor_AI_Engineer_Resume.txt',
    summary: 'Applied Machine Learning engineer focused on multimodal LLMs, RAG pipelines, and automated agent workflows.',
    highlights: [
      'Built production RAG system serving 250,000 queries/day with sub-second hybrid vector search',
      'Optimized model inference latency by 58% utilizing quantized vLLM clusters',
      'Published 2 papers on retrieval augmentation and automated prompt evaluation'
    ],
    content: `AMINA AL-MANSOOR
Lead AI & LLM Systems Engineer
Email: amina.almansoor@neurallabs.ai | Phone: +1 (617) 505-8941
Boston, MA | GitHub: github.com/amina-ai | Google Scholar: scholar.google.com/amina-almansoor

BACKGROUND
Applied AI engineer with 6 years experience bringing neural network architectures from research into high-scale production systems. Specialized in LLM fine-tuning, retrieval systems, and autonomous agent loops.

TECHNICAL EXPERTISE
- Frameworks: PyTorch, vLLM, HuggingFace, LangChain, LlamaIndex, Ray
- Vector DBs: Qdrant, Pinecone, pgvector, Milvus
- Engineering: Python, C++, CUDA, Triton, Docker, FastAPI, AWS SageMaker

EXPERIENCE
Lead Machine Learning Engineer | NeuralScale AI (2022 - Present)
- Engineered enterprise RAG workflow indexing 40M technical documents with 94.2% semantic precision.
- Deployed distributed inference engine with vLLM, saving $32,000/month in GPU cloud spend while halving latency.
- Created automated evaluation harness testing hallucination rates across 10,000 synthetic test benchmarks.

Machine Learning Engineer | Apex Vision Tech (2019 - 2022)
- Developed computer vision pipeline for automated document OCR and parsing with 99.1% character accuracy.
- Managed end-to-end data annotation pipelines and trained custom Transformer encoders.

ACADEMICS
M.S. in Artificial Intelligence | Massachusetts Institute of Technology (MIT)
B.S. in Electrical Engineering & Computer Science | MIT
`
  }
];
