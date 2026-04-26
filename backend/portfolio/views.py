from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from google import genai
import json

@api_view(['POST'])
def generate_portfolio(request):
    data = request.data

    # 🔥 fallback (always ready)
    fallback = {
        "name": data.get("name"),
        "role": data.get("role"),
        "about": data.get("about"),
        "skills": data.get("skills", "").split(","),
        "projects": [],
        "email": data.get("email"),
        "linkedin": data.get("linkedin"),
    }

    try:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)

        prompt = f"""
        You are a professional portfolio writer.

        Return ONLY valid JSON. No extra text.

        {{
          "name": "text",
          "role": "text",
          "about": "text",
          "skills": ["skill1", "skill2"],
          "projects": [
            {{ "title": "text", "description": "text" }}
          ],
          "email": "text",
          "linkedin": "text"
        }}

        User Data:
        Name: {data.get('name')}
        Role: {data.get('role')}
        About: {data.get('about')}
        Skills: {data.get('skills')}
        Projects: {data.get('projects')}
        Email: {data.get('email')}
        LinkedIn: {data.get('linkedin')}
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()
        text = text.replace("```json", "").replace("```", "").strip()

        print("RAW GEMINI:", text)

        try:
            parsed = json.loads(text)
        except Exception as e:
            print("JSON ERROR:", e)
            parsed = fallback  # 🔥 fallback use

        # 🔥 structure fix
        if not isinstance(parsed.get("skills"), list):
            parsed["skills"] = fallback["skills"]

        if not isinstance(parsed.get("projects"), list):
            parsed["projects"] = []

        return Response({"portfolio": parsed})

    except Exception as e:
        print("SERVER ERROR:", e)

        # 🔥 NEVER send error only
        return Response({"portfolio": fallback})