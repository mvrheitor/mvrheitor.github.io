import random

phrase = {
    1: "ola1",
    2: "ola2",
    3: "ola3",
    4: "ola4",
    5: "ola5",
    6: "ola6",
    7: "ola7",
    8: "ola8",
    9: "ola9",
    10: "ola10",
    11: "ola11",
    12: "ola12",
    13: "ola13",
    14: "ola14",
    15: "ola15",
    16: "ola16",
    17: "ola17",
    18: "ola18",
    19: "ola19",
    20: "ola20",
    21: "ola21",
    22: "ola22",
    23: "ola23",
    24: "ola24"
}

while True:
    print()
    print("==========================================")
    print("DECORAR PASS PHRASE DE CARTEIRA DE BITCOIN")
    print("==========================================")
    print()
    print("Escolha uma opção:")
    print()
    print("1 - Acertar a ordem das palavras")
    print("2 - Acertar a posição da palavra")
    print()

    escolha = int(input())

    if escolha == 1:
        erros = 0
        acertos = 0
        for i in range(1, 25):
            print("Digite a {}° palvra".format(i))
            print()
            word = input()
            if word == phrase[i]:
                acertos = acertos + 1
                print()
                print("Correto!")
                print("Acertos:", acertos)
                print("Erros:", erros)
                print()
            else:
                erros = erros + 1
                print()
                print("Incorreto. A resposta era", phrase[i])
                print("Acertos:", acertos)
                print("Erros:", erros)
                print()
        
    if escolha == 2:
        positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        erros = 0
        acertos = 0

        random.shuffle(positions)

        for i in positions:
            print("Digite a {}° palavra.".format(i))
            word = input()
            if word == phrase[i]:
                acertos = acertos + 1
                print()
                print("Correto!")
                print("Acertos:", acertos)
                print("Erros:", erros)
                print()
            else:
                erros = erros + 1
                print()
                print("Incorreto. A resposta era", phrase[i])
                print("Acertos:", acertos)
                print("Erros:", erros)
                print()
