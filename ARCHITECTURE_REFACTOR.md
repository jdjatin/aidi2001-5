# Resume Tailor - Architecture Refactoring

## BEFORE: Monolithic Layer Structure 

### Problems Identified:
1. **Mixed Concerns**: All business logic scattered across `lib/`
   - `resume-parser.ts`, `resume-tailor.ts`, `resume-service.ts`, `resume-ingestion.ts` 
   - No clear separation between domain, service, and adapter logic
   - Functions doing multiple things (parsing, storage, API integrations)

2. **No Clear Dependencies**: 
   - Direct Prisma calls throughout business logic
   - Gemini API calls mixed with business logic
   - Hard to test in isolation

3. **Error Handling**:
   - Inconsistent error patterns
   - No standardized error types
   - No clear error recovery strategies

4. **API Routes**:
   - Thin routes with minimal abstraction
   - No standardized response format
   - Error handling scattered across routes

### Original Code Flow:
```
API Route → resume-service → resume-parser, gemini, prisma
            ↓
         resume-tailor → gemini, prisma
            ↓
      resume-ingestion → file storage, prisma
```

---

## AFTER: Clean Layered Architecture

### New Structure:
```
lib/
├── api/
│   └── response.ts           (Standardized API responses)
├── types/
│   └── index.ts              (Shared domain types & errors)
├── domain/
│   └── resume.domain.ts      (Core business logic & validation)
├── repositories/
│   └── resume.repository.ts  (Data access abstraction)
├── adapters/
│   └── ai.adapter.ts         (External service integrations)
├── services/
│   └── resume.service.ts     (High-level orchestration)
└── [existing files...]
```

### Architecture Layers:

1. **Types & Errors** (`lib/types/index.ts`)
   - Centralized domain models (Resume, TailoredResume, etc.)
   - Strongly-typed errors (DomainError with codes)
   - Single source of truth for data contracts

2. **Domain Layer** (`lib/domain/`)
   - Pure business logic & validation
   - Independent of databases & APIs
   - Testable without mocks
   - Example: `ResumeDomain.validateForTailoring()`

3. **Repository Layer** (`lib/repositories/`)
   - Data access abstraction (Interface pattern)
   - All database operations encapsulated
   - Can swap implementations (SQL, NoSQL, mocks)
   - Example: `ResumeRepository.findById()`

4. **Adapter Layer** (`lib/adapters/`)
   - External service integrations
   - Standardized interface contracts
   - Built-in error handling & retries
   - Example: `GeminiAIAdapter.generateTailoredResume()`

5. **Service Layer** (`lib/services/`)
   - High-level business orchestration
   - Coordinates domain, repositories, adapters
   - Implements domain workflows
   - Example: `ResumeService.generateTailoredResume()` - coordinates parse + AI + storage

6. **API Layer** (`app/api/` + `lib/api/`)
   - Thin request handlers
   - Request validation & routing
   - Uses service layer exclusively
   - Standardized response format

### New Code Flow (Improved):
```
API Route (route.ts)
    ↓
ApiResponse.success/error (standardized responses)
    ↓
ResumeService (orchestration)
    ├→ ResumeDomain (business logic)
    ├→ ResumeRepository (data access)
    └→ GeminiAIAdapter (external services)
```

---

## Benefits Realized

1. **Testability**: Each layer can be tested independently
   - Mock repositories for service tests
   - Mock adapters for domain tests
   - Mock services for API tests

2. **Maintainability**: Clear responsibility boundaries
   - Adding features requires touching only relevant layers
   - Changes to one layer don't affect others
   - Easier code review and onboarding

3. **Error Handling**: Standardized & recoverable
   - `DomainError` with typed codes & status codes
   - `ApiResponse` ensures consistent formats
   - Clear error propagation

4. **Scalability**: Easy to extend
   - Add new adapters (other AI providers) without changing domain
   - Add new repositories (different databases) without changing services
   - Add new services without touching API routes

5. **Dependency Management**: Explicit & traceable
   - Service receives dependencies (repositories, adapters)
   - Can inject test doubles for testing
   - No global state or tight coupling

---

## Implementation Examples

### Before: Mixed Concerns
```typescript
// Old: resume-tailor.ts
export async function generateTailoredResume({ resumeId, jobDescription }) {
  const prisma = getPrismaClient();
  const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
  
  if (resume.parseStatus !== 'PARSED') {
    throw new Error('Resume must finish parsing before tailoring.');
  }

  const ai = await getGeminiClient();
  const prompt = `...`;
  const result = await generateWithRetry(prompt);
  
  // Response mixed with logic
  return { ...result, resumeId };
}

// Old: route.ts - Direct service calls, no standardization
export async function POST(request: Request) {
  try {
    const data = await generateTailoredResume(req.body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### After: Separated Concerns
```typescript
// Domain: Pure business logic
export class ResumeDomain {
  validateForTailoring(resume: Resume): void {
    if (resume.parseStatus !== 'PARSED') {
      throw DomainErrors.INVALID_STATE('Resume must be PARSED');
    }
  }
}

// Adapter: AI integration
export class GeminiAIAdapter {
  async generateTailoredResume(params: { resume: string; jobDescription: string }) {
    // AI logic isolated & testable
    return { tailoredResume, summaryOfChanges, highlightedKeywords };
  }
}

// Service: Orchestration
export class ResumeService {
  async generateTailoredResume(resumeId: string, jobDescription: string) {
    const resume = await this.repository.findById(resumeId);
    this.domain.validateForTailoring(resume); // Use domain logic
    return await this.aiAdapter.generateTailoredResume({
      resume: resumeText,
      jobDescription,
    });
  }
}

// API: Thin handler with standardized responses
export async function POST(request: Request) {
  try {
    const data = await resumeService.generateTailoredResume(...);
    return ApiResponse.success(data);
  } catch (error) {
    return ApiResponse.error(error); // Standardized error format
  }
}
```

---

## Next Steps for Full Refactoring

1. **Migrate tailoring API** to use service layer (similar to resumes)
2. **Create JobDescription repository** for JD data access
3. **Implement TailoredResume repository** for variant storage
4. **Add integration tests** for service layer workflows
5. **Update components** to use standardized API responses

---

## Files Changed/Created

### New Architecture Files:
- ✅ `lib/types/index.ts` - Domain types & errors
- ✅ `lib/domain/resume.domain.ts` - Resume business logic
- ✅ `lib/repositories/resume.repository.ts` - Data access layer
- ✅ `lib/adapters/ai.adapter.ts` - AI provider integration
- ✅ `lib/services/resume.service.ts` - Service orchestration
- ✅ `lib/api/response.ts` - Standardized responses
- ✅ `app/api/resumes/route-refactored.ts` - Refactored GET/POST routes

### Existing Files (To Be Refactored):
- `lib/resume-service.ts` - Migrate logic to services/
- `lib/resume-tailor.ts` - Migrate to adapters/
- `lib/resume-parser.ts` - Migrate to domain/
- `app/api/resumes/[id]/tailor/route.ts` - Use service layer
