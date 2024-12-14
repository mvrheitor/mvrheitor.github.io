import json
from groq import Groq

def draft_message(content, role='user'):
    return {
        "role": role,
        "content": content
    }

client = Groq(api_key='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')

# Abrir o arquivo de músicas
with open("C:/Users/Heitor Macedo/OneDrive/Área de Trabalho/mvrheitor.github.io/Músicas/Musicas.txt", "r", encoding="utf-8") as file:
    musicas = file.readlines()

generos = {}

for musica in musicas:
    if not musica.strip():
        continue  # Ignorar linhas vazias

    messages = [
        {
            'role': 'system',
            'content': '''Seu papel
Você é parte de um programa crítico de computador que classifica músicas exclusivamente pelo gênero musical. Qualquer desvio nas respostas causará a falha total do programa.

Suas instruções
Receberá o título de uma música e o respectivo artista.
Sua única tarefa é retornar exclusivamente o gênero musical em uma única palavra.
Regras Rígidas
Apenas o gênero musical. Não inclua nenhum outro texto, como comentários, explicações, ou mensagens adicionais.
Caso uma música tenha múltiplos gêneros, escolha apenas o gênero predominante ou mais próximo.
Não retorne justificativas, mesmo que sejam relevantes.
Qualquer resposta diferente do gênero em uma única palavra causará o mau funcionamento do programa.
Exemplo
Entrada: "For Whom The Bell Tolls — Metallica"
Saída correta: "Metal"

Entrada: "Blinding Lights — The Weeknd"
Saída correta: "Pop"

Entrada: "All Of Me — John Legend"
Saída correta: "R&B"

Restrições Adicionais
Para reforçar as regras:

Não forneça mensagens de erro, explicações ou qualquer tipo de texto extra.
Se não puder determinar o gênero, retorne "Indeterminado" como única palavra de resposta.
Atenção: A falha em seguir rigorosamente estas instruções causará o colapso do programa.'''
        },
        draft_message(musica)
    ]

    chat_completion = client.chat.completions.create(
        temperature=0.1,
        n=1,
        model="mixtral-8x7b-32768",
        max_tokens=10000,
        messages=messages
    )

    # Resposta do gênero
    genero = chat_completion.choices[0].message.content.strip()

    # Adicionar ao dicionário de gêneros
    if genero not in generos:
        generos[genero] = 0
    generos[genero] += 1

# Salvar os resultados em JSON
with open("generos.json", "w", encoding="utf-8") as output_file:
    json.dump(generos, output_file, ensure_ascii=False, indent=4)

print("Gêneros processados e salvos em generos.json!")
