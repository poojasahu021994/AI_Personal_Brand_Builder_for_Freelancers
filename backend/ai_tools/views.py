from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from google import genai

@api_view(['POST'])
def generate_resume(request):
    data = request.data

    try:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)

        prompt = f"""
        You are a professional resume writer.

        Create a clean, ATS-friendly resume using the following details.

        User Details:
        Name: {data.get('name')}
        Email: {data.get('email')}
        Phone: {data.get('phone')}
        LinkedIn: {data.get('linkedin')}

        Summary: {data.get('summary')}
        Skills: {data.get('skills')}
        Experience: {data.get('experience')}
        Projects: {data.get('projects')}
        Education: {data.get('education')}

        Instructions:
        - Keep it professional and concise
        - Use bullet points where needed
        - Improve and expand the content
        - Do NOT add fake information

        Return ONLY valid JSON in this exact format:

        {{
        "summary": "text",
        "skills": ["skill1", "skill2"],
        "experience": "text",
        "projects": "text",
        "education": "text"
        }}

        Do not add any extra text outside JSON.
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",   
            contents=prompt
        )

        return Response({"resume": response.text})

    except Exception as e:
        return Response({"error": str(e)})


      