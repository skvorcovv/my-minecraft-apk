// Basic 3D Mobile Minecraft Clone using Three.js

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 10, 50);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: false }); // Disable antialias for performance on mobile
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

// Texture loader (Using solid colors to avoid CORS issues in file:// protocol on Android WebView, but simulating textures)
const base64Grass = 'data:image/png;base64,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';
const base64Dirt = 'data:image/png;base64,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';
const base64Stone = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAATL0lEQVR4nI2a2VbbyraGS6W+t4yBQBj7sTPGer1AiAM2WH0vnYsPz6WdfXN0keEYuapm/89/lvHjx49lWbIse3t767ouTVOllFLKcZyu65RSURQNwzBNU5qmeZ4rpdq2VUr5vh/H8cvLy3/+85+2bYdhUEq5rtv3fdd1nuep69M0TZZlnuc9Pz8/PT1N01RVleu6TdOEYViWpeu6SimtdVVVQRC4rns+n6MoWtfVMIyiKFzX5Z3tk+f5/f29zvNca53nueu6aZrO86yUGsdxGAbXdR3HKYpimial1O/fv/ml7/vjOCqlDMPIsuz5+VlW7/teKXVzc7Msi2VZYRgqpYIgmOf5eDwmSXI8Ho/Ho9Z6HMckSdilLMuu65ZlCYKg73vTNKMocl3XMAzLspIkcV2XpXg4T5qmXdfpNE3jOOZASinTNOM4tm0bMT4+PizLUkqVZRkEgdiHnZDWMIxlWVB5Xdf82/f9NE11XcdxzJZYTBaJouj9/Z3V0jT1PA+Do4swDPu+j+N4miZWWNd1GIY8z5Mk4UjLsszzrPM8X5aFE/Pq+XwWWZMkadu2KIo4jl3XxYVM07QsKwiCuq7zPI/jeJ5ntg/D0DAMrIQkv379Ylm0IFaqqso0zSAI+KYsyyiKxOWwNpbpuq4oiuPx6DgOPoK7aq1N09Tfv3+/XC7LssgGjuNsXc33/SRJZOOmadgJ9YsyEABVycnCMEyShGV5wjB0HEeiqGmatm3DMETZaAcLI/YwDMuyfPv2LUkSwzCGYajrehiGdV1ZUFdVpbXGAv+fJwiC0+kkLpdl2TAMwzAEQYCceHzTNGmaYg2xQBRF+Jjv+3me89nzvM/PTxwJvczzbFlWWZbzPCdJMs8z63RdR0wuy8I3Silt27ZpmvM8a635qq5r+bw9txzatu1lWfq+tyyLRfmmKAqswVkl+suytG277/uqqizLqqpqGIY0TYnLcRzDMJznOc9z9GiaJtbGGq7r1nXtOA7hkaYpYc2fNMdyXZeNlVJ3d3fymQ1s226ahjDlTMuypGk6TRMLnU4nQoUvbduuqgpfkkXIadM0hWG4rquoTM5almVVVbwvaW1dV15g32EYfN+3LIsv+763eK/rOtu2ORCW5c+u66KVYRgcx/F9f11XsQ+uj7tzVqKc913XxVObpgmCgCApiuL+/r4sS8/zUNN+v0eJYRiysm3bYm3Wwf7LsjiO0zSNKNd1XY3nGYZhGIbjOEiW53nTNLZtY1lyNhJ2XccSXdeN42gYxvF4RFWENemFb8T9oiiK49gwDNLaw8MDmSRJknEc67o2TZPTcx7P8/BPTNE0zel0kuhHd2hWi85M02RRpdTDw0MQBOSpNE2LouC4nOwvQ5MxxeuiKJrn2XEc0zTZMo7jqqrIIbyDTyuljsdjHMd3d3cEwLqu5/N5HEecDaeV9DoMg5Qzy7I+Pz/7vtdiEcmDGHpbmMiGTdNs3xEf26bdpmnQseQixEPsvu/Hcez7vu977HM4HEj2+/3+fD5TesXj2fr19VUsQ8UEqiCYxoPVtQiIfJwVrzBN8/39fb/fi45F5r7vh2HAJp7nSRVblkVrnaYpiS9JEpIVGOH29lYEBjsNw7Db7fiSdMyzrqt8r5QiljzPG4aBpKfR9/ZYSikMqrV+fHy0bTvP89vbW0RCYN/3OZ9SynEc/IdMUBSFaZpgG4oOgExdoR47dl2XJEld167rWpbVtq1knqIo8Iu+78/n87IsUhnJB5goSZJlWbTv+1mWgftEhjRNKc9VVeFFW/sopd7f36MosiwLiydJorUOw5D/YjetdRAEJE0kNAxDfGNZls/PT3w6TVPf9yVARaemafq+T5kSVyd2sdI4jvrPnz9lWWJ6iU6KC3APBHK5XNiMhdI0xWXLssTLRVR5lmVpmoZ4Jf+M46i1Jr2u64owvu93XVdVlSRTXlZXnDLPM3Zjo1+/fiHhPM+u6+pv374FQTAMA1FL6UbKPM8dxwnDsG3bm5sbtIKQvENeEmBDGKhrTeADWXgcx9fX12EYtNZ93xuGsdvtXNfl577vR1HUtq3neafTaRiGvu8xmm3bNAOGYczzXBTF1tWVUrppGq017UvbtsfjUbYPwxA/BnVhSjwH1wfxkxyRmdI2zzPhYds2cN1xnNvbW0kYRVFQQ3C2y+UyjuO6rjjV4XAwDENrHUXROI6e54Vh2DTNMAyWZeFUoiYNmqcMUWgF2NV1bVmWbdtlWaJmpOfE1MjL5UIapUKLJSkvRVE4jvP29jZNU9u2tm2zzsPDw7Isl8sliqJpmgzDEFG7rsPyBJ5UUhLXt2/f2rZ1HAcfa9tWo07DMEgdYRjiqQAsdQW0aZpqrdu27bpuC/ukARDHkwf0MQxDkiRxHDdNU5YluRi8mKZpWZZZlimlaHSmaZKjq2tRB/y9v78vy/L29qaUOp1OePJ+v9ckRw4hjWzXdXVdU2uSJCGaBbpIJpG0gCR1XcsKxG6apq7rjuNIaRPcIR1p27ZlWVqW9fHxkec5OIX2wHVdcDiuQuKm5qzrSkC+v79bBN80TQJdRB5pJuWzUup8PvNZ2s5hGLIsa9u2bdumaQ6Hw8fHRxRFaZo2TSPtNY5KbGRZtoWrWmvP8+jshmEwTRO4bhgGYVMUBSFxe3trmiZxa5rm4+OjBgLleb7lEaigeDyCcehxHKVB+/z8lLRLT3M4HO7v70XZeZ6jHRqodV3ZYl1Xfgj4lTRAFvJ9n+MGQSBNjxxmHEc63n8FI6riOBY0liQJbjdNE10IFWBdV9/3cQmWELNorcHojuPgOXEcJ0myrfEkUMzbNA0FWF3hFvKcTiepx4Zh+L6P/UlE0zSRaYIgkLrxFY6u66KtpmmKojAMgz4Gy3JcloBuwA3oQnDTqqqAKPM846PwOawv3AQxDamBfxIngJc0Tfu+x83qurZtW9rRuq7B/OpaTMHhxj///MPe9AN0zVsSRk7wF5qguOB72/jhQX4kb5pmmibLshzH0Vovy4LPrOtKmt82gGIQcp3v+57nzfMsLQ51oKoqUJ2+XC4k6bZt+fG6rnmeUx/iOCajw8zhxGgFFAkuiON4XVfB1Wma2raNSU+nk7pidSpR0zSocEvAyBOGYRiG9/f3vu/v93vwVVEUEm94dZqmNzc3YRgaP378SNOUOAYh4gPi39unqiph/FAznRTdZl3Xf2VYgDSfhbriwWiGYWBwDOX7Pvhca70lFgSEinmbpnl6eirLUodhmOc55e3+/p5F5fSyJS4bRVEURYAIzDLPs2maRVHgxJZl0bKg4y2yP51OZBUiG59W13zSNA3Ytm1bmAucTV17VxahthItr6+vlmXpuq5JmlTiYRiiKEJ6siHbuK7LlzgfmqYJnOd5274BvyQqqqoqyxJwBpXy9PSkrmUEfVElp2n6+PggDsmKQNc4jvFJdSUFUcHt7e08z1oplec52YM4bpoG0Ul2SG9ZFl/SMUZR1Pd9lmVbQklrLVgAclNdc+jd3Z1Yg++FTmVNTG3b9m63E43wYCKOUZYl0Yhl1nXVgBxcglRDvQS6KKXAKqi8rmsAqWmasMqO4whzhsxQttDdfPn09CQgHAEoKRBySimIPXaHvl3XlR6t73vBdpwwTdN1XVFHVVX65eVFUnue56ZpGobx+/dvKZx/MZuS5qi4/CugQMhn/m3bdhzHPM+lt1ZKeZ6HPxwOBzyN/5ZlSX67XC7kK4qu53li5LIsX15elFKgumVZtFBO7Ho4HGjHlmUhhYFm1X8/b29vYJLdbvfx8dE0DVTKVlSllO/7sHpqw3kRQgiDYMuyyBYUXaob7kdXSGLIsmy321FV8D2dZRlyx3F8PB7BSSRKOn9MRsJhD1qkw+FAbNDTqWufwHGJs60Tp2nKsfiS9sqyLM/zIN66rpNyKdLyw5eXF9d17+7u6CQh9/mrPp1OQrJCoJLa9/u9lBjGLVvmK4qi0+kk5D2eQEYChEmHTl5H379+/aqqiq4NOInYMI0AE9zJdV1ZIc9z4pABVBiG1JwvARzH4T9d18H/KKVQP/4tPkrgep5H4DqOA2MDSkuSZLfbwfwEQSDMz263433q+n6/NwxDGCStNfaH4md6EMex53lZlkmqlQ/kDzmYEjAnD9FNL8c30A1Q++u6dl338fHx9vZm27aQX57nUcuWZUGLcIlKqbZtSUHkOoY96lo0lmX5+fOnUor8+/n5OU0TuYheAqfquo4UDxmjrljrqw6Iq8lnyV8IDcD2PA/ADEr9C8MEQbA9t2mawowLj2DbNliaFRCMfS3LogWllZE6KKmJREfyUNfINk1TS4bexo3jOIw71RW0kKxoXDjK8/Oz2syjUBhnlbLACp7nYVjim/kKJZ8Tk8RB4PJC0zScDXKJAno4HEjunucBvbS6TsvYEs/BvqxrGMa6rm9vb+BejggAEaOR1MjWePzWONCjokhoPLAkpJ1lWVrrJEmQczvPrOuazgnPIW2oK0izLEu7rispj1Sgrt29sKqwjrS5CEniwlPbtpWxDc4jpR294hWMGeFJoWrquh7HUcaEEpdN06zrGgTB5XKhLgEZZVPGYhxSy7wpiiLEStNUelbRImlEKdW2rRRddABTQkcL9cJvCQAoWDr6YRik6IqaGCGLg83znGXZ+/v7NE1PT0/U8iAIiqKo67osy4eHBxoYTqvhm8Zx/Pz8bJqGyQL63gpA3SVhi9sw3xVqUagX9Lff76uqmqYJqmK329GClWWJCugJKfbYFha6KAq4QMISbhTvgl9a11V6Rs1+tm0HQcAIFZjx+fnJaeq6liH2uq4wjfiGUDdbvrKqKiAtbMrNzQ1RCAMXBAEUJScjbKQH5KycBLoujuObm5vtRQlABxh0XVdtWZa0V1gcXonupOu6+/t73HQYhsfHRxAo5xOXwOXQaxzH21R9PB7Fuemkbm9v2YvLBMuycD4wKbo7n8+e58ERSnoEbsiObdsahqFxGHmDo+CjTFMY7qprSbq7u6MQQp8IEDRNU1rqLaEEOMPNpKCCWRhPcfEDC0sfx32Stm2xDDJQPQTMQu5/NVlwT4xkxnEkLzVNg3H4r4ihrv2KBLTv+4JGoabhZoA0dL0ED1q8XC5ycQFN+b4vQIuWkrjnoDRxPIQ10R/H8Vclxhnobm3bJmK2HRNlkhXLsrxcLsA+WVTm+8wEWMF1XcbAcNHqOgNO0xTKkZ97nrcdz0zT9PDwADmnlNJa0wPwCIzb7/dfAmitZfjDrSF0DPECc0+rKiJhRClYMLJq8yAqdYeXb25utn+ybRsuQyn18+dPuValNtMXvIM3xf0eHx9ZeRiGj4+Pr55YWHIaKBwa6Aapvz2fjICYiSilgNDyDsMLdQUacvVGXTGvvCYXZ+B6pU2ZpglURzgREiTT379/F0UB6e/7vkX+VtfkLdUEfYzjeHd3J9v3fU/nLqBFMsw2oMm/8zyTErjaoa5cmLomKEqQUirLsi0LJN3Zzc0NEnIp7vX1lf6YOQjOprlAIJ4gqziOc3d39/37d6KNpyzLZVl2ux2KwcoQ/HKRKoqi/X6/vT0wz/OfP3/IvPRxtA2YETC3vWYn0ypOT4EXN4HZ5c26rjVToK37QhCBjeVV3INm5XK5QO7RKMVxHIYhcy5AK2mH+S4/J5aWZZHrYKygrhDQdd3/5e2ogH9dDzidTgK2bdvW6n/YSYKV1l5rvcWnzFTwDekbub2EDIBqdYXE4gwgZ15GF9M0bdt8hhrqmrLp2mggufyE35umyXwNv3AcR9PU4qBycYZLNHVdS6YXxZRlmSQJLkTF5ToH/6prM0CVFZ9ksoRg6ELgKpc6hAxloiUtIY0edBCw1LIsriR9odHdbgfghlGks4bWg3NFJPwVF5T6kqYp5+BKJeNU/MGyrLe3N5CZul6FgU2gggq8kWtPXAzA3aENp2na7Xbbi11KKQbsYCqllKbdhECtqupyucCjHI/H8/mMGiDEp2naksaMtEgAZD0Z1jObYIDAOAOBuTEAHS+5QUoKUzDm+yiCkcL2NR4iDT3+exo+AODCMNztdpIWmGSlacrqfLllfp6enmTyh6aVUlmWcdUQ3hxenve3/TeDXbWhU8VupEtp5TieNEOkNY0T//nzh2CXeTqYgj244wo3QeaR0zN3AoGrK7nE9S66BRnpSRio6yUGmsbn5+cvb9Z6C5u11lyL2HoaokLPKIKYy2AMOpVSsA/TNHFjiXs+YFJ+D6RBx5Zl0ZEwWmRpEtQ4jkIAEvFSp8kt6ooL5b7z8XiEtOK1ZVlgQ7ibQ47ir5ZlcQzFvVFp6pBJ+lSacamFRVH0fU8lgkzmHNIK8xPf92V2fz6fscC2ze/7niAB9qlr4oJi28rcdV2WZQQSNBS3mDjw15VxFqVl5n6SjNwoSeiVHBzHsYBBLjWYpknrg+tz20nOynwEyl8aJoSBw+KgYFt8WLhRnILtZJLNIIdLIATMvze25GTcDyS9oGMuFHFVXg7HgS6XC7NbrtOrDbGOIoFczGTV9Z6K5BnGRLvdjut3cv9b6hp8mVLq4eEBVpPbBmRwwzD+D7TRHMalOgwlAAAAAElFTkSuQmCC';
const base64Wood = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAATB0lEQVR4nJWayXLjynKGC4V5JqlZPHGfwQ577aexw177eeyw136tPlJLaook5hnlxSflxW2vjIWCIoFCVo5//lnWf/zz3zmOU5ZllmVKqTRNm6ZZ11V9X5ZlGWP4vCyLbdvqb6+u68Iw5CfXdadpKooiz3N+tW2bn5ZlcRxnGAZZIU3Tqqp83x+Gwfd9y7LO5/Nut7NtuygKz/OUUkVRhGEony3LQs55npum0VrrdV2R3vO8cRyrqlrXtaoqhE7TVKRXSk3TtBU9jmOl1G63Q9A0TT8/P23bzvM8CAKllOd5y7LwCqWU7/vGGGMM26vrehiGsiyHYXBdt+/7KIqmaeq6zvO8vu+VUnmee56X5/k4jkqpLMuiKFJKRVHET9p13SzLpmk6n88iq+d5lmWhXR5AesSS63w+I4dSis1nWcaLPz8/m6bhrVprtuo4juM4lmWxFOrnKoqCNY0x6HiapnEcsyyL4xiDsO22bZVSZVk6jnN7e6vF9Mfjcb/fI6Lv+zjPPM9t2yKH67qoBB+wLCtJEqyJSvC9dV1t247jGKG3Buz7Pk3TcRzHcez7PkkSXqS1Zs0oilzX7boO4+M58zxvLW9ZVlEUu91unueXlxftOM66rm3bGmPatnUcR+4LwxDfYCGlVJIkRVE4jhPHsTGGdR8eHtq2nec5jmPLsuI4XpaFB4MgwJKygaqqoiia5znP8yiK8H7ub9v2crlM0zRNE0bQWl+vVxyMrSZJggf2fc9tWikVhmEURbhpXdfom/0opVgdd+LXYRiapmnbFrW1bct+8FEMkqbpsiyXy4Vnm6ZRSpEbiL+iKD4+PoZhGIYBccVX53kWYbTWfDkMg1Lq9fU1DEOUgkdoWZfXi9GnacJZx3HEGe7u7kSvbGxZFoLeGMOi7+/v67pmWVZVlVJKYubx8VGiRSn1/PzseV6SJIhVVVWSJH3fo2a8gJiOokjsr5Ta7/dvb2/GGLxDs7++77EpKidXTNNkjHFd1/M8Etb7+7tt23VdE6Za63meXdfd5tynp6c8z9/f36dpKsvSsqw0TVE28ZPnuTGmKArsjFLWda3rOggCNIhTYMnr9eo4TpZlXddtfdK2bcuyrterxhCO4xRFwTMY4ebmhs9pmvKOdV3HcSQVGGM8zyOZGGOSJMFKp9Pp8/Nzv9+7rks8TNP0/PwchiF6bZpGXAXHsG0bPZZlKX7YdR0Zouu6tm3LsqTUXC4XNlnXtTHG933dtq3sm+RARiN2syyTKDwej7Zto37LsoZhSNMUhxHfmKbJ8zw84f7+vuu6oiiKohiGYZ5nVq6qqmka7tnG2M3NDY53vV4JLakYYpY4jvE6du77vvXf//aP67pKrDiOM88z30h5/n9dRVE8PT11XYc6l2U5HA6IHsfx5XLxPM/zvM/Pz+fn56qqCDbso7Um54RhiM+wPYp9EARd1+V5TrGr63q32+k8z7XWsoHr9TpNE/9SnvleHL1t260PbLMk/97e3qI8vgEXIH3TNJTIIAjwTEoQiZ+34NJd1w3DsCwL7yJkjTF1XZdliYMlSdJ1nT6fz2VZinxJkmy1jtMTxCIiWZ/bAA62bZP4JPlWVSW+IZbhgzFmXdc4jl9fX/mSzbCCXL7vp2nati3+iXG4Uyn19vbWtq3rutq27d/8pOs6qpvozxhTVZVt203TkBAdxzHGlGWJZzuO8/z8TNJkA8YY9DrPM2HTtq0ogs+EkOu64zimaYoYmFRrLUgEL0D0PM8BB6Jo6z//5e9t20ag6/XKQk3TdF0XBAHGOR6PVVXN83w4HD4+PizLIgR933dd93K5YHcuRMRh0AKxJLWi73utNRnier2KbZVSdV1TzrXWvu+zYZxWgHDTNGS8aZpc19UsSkYHZnRdB/SNoihJEq01ycFxnB8/fvi+n2UZb8VNkV4Cg4TbdZ245fF4pGjwbxAEh8OBclvXNf6Nmo0x8zyHYcgKEoqWZVHLlVL7/Z4PnudFUUQA677vHcfRWgNofd/H+bquu7+/V99FOs/zrus+Pj6wwDAMkm3wHNZtmgZxy7KM4xjI4LouKuz7/ufPn6QdUn5ZlgRAmqau655OpyAIhmEgR/m+X1XVw8MDmsKvJN6+oEQQBHVdI31VVcMwUEfUd56WCLu/v396euL1+OVviSgMw7u7O4HvTdOEYci7WWq/34MU8zwnQI/HI2U4iiJ8lSJ1OBxc1/38/EySpKqq8/mMXkghX4BvmxOJ2nVdp2nixWEYUjiwZl3Xb29vXdf9+vWLcJdtBEGgtbYsa1mWtm0Fvv+2eFmW4ziSAYuiuL+/n+eZ1cqypKo6jsM3INMgCHCQNE3BB47joKA0TfXpdEIU6QTyPMcvu67ruo6EeLlcCIn7+3s8FYGUUj9//myahk5ynue6rrFe8X3RfBDZ29KO4zmOI5iPjKe1fnp64htMd3NzQ8KVv33fE0KaULu5uQHA0RkCY2gI0zS1bTtJEkHtAFoim4LieR6IMggCz/Pe39/REOgNRxI/ZPPiomgNY97e3qL46/VK2eIGyTxc2LZpGmOMZqG2bUnJIGSWw9Y8s9/v8SWllOd5cRzjOcSu67pRFG3hN1mFR7YJSl5f17VUumEYRHTieFkWy7KoOVhM3GZZFjbGK/6ag/EBHOM3wJhl2cfHh+BQbuP5siyB9QLORG2oFrAZhiF5fdv+Cj1RFMWyLPhtVVWHw8EYg6DTNCHMsiye5xljbNu+u7sry/KroUmSBN2HYai17rrucrmQGakjvu+XZRkEwVbueZ7RR5Ikl8slTVOxD0bjXx55f3+n66VNk9vkkTzPCX3Z+eFw6PsexNE0TRAE0oi3bQttUVWV1lr//PmT/tIYE0VRGIYPDw80u3Ecr+tKA4pulFLn89l1XWmdaQwETeHlQRBgEBrfOI7neZaWg8iGkhDMB0Tj3/f3d8IvSRLUVFWV5DTYA+I+CALrv/71HyzLKsuSXkkp1fd9GIZbNgGFbX0Dv2efbIAVIZqQVcIOiC5ulqbp29sbvQ5uAGyWBdUmarESmOV0OuV5DjCBDlNK6d1uNwzDfr8Xicm7xhh2Twyhfom8LUU3jqPkQWnb4zjGd1E/QkzT5DgOuBBPYP88Pk0TIEJrTUyrb9SIqQE71C9hrvSyLH3fb8stfg/vpb6xuOd5juM8Pj4it7RmqBARt5WLWBLfEKNRH4MgiKIIg4zj2DSN+CQ27LqOX23bluq7LAtL5Xl+Op0AXZoeB8VL+1tVlWAHuhPP8yhSlAhRORsQgLV1MN/3wzCUlheDkPIpNYhIoURKujCKBn/pkOjFhBApigIuVWutJS3A6bFFoBHf8zL2A4Py+fnZ930cx6QgAMwwDOQcdMlfbMieLcuS/u50OgE3uPNwOIgBl2VhY3Rq5FPsxg65TQqUnudZoGVVVWEY1nUNYYrz4f3QGPC4OF/TNHVdp2kKgSOwfvtBMm/TNNyPgqIosm0bOjUIguv1GoahwATHceBkpTMGCtzd3YVhSM1Fv3mea2OM5GOKBYG4rusWtKAAIZmbpsF5QM5t2+73+7IsqcTsHFFkhXmePc+DWYCyVhs8K06PgsMwxIVo6Oq6fnl54RsYZSzw8fHxxQsJDQrhCPUnG1PfvICoP45jopmGcJ7n0+mUpqlQ7fM8p2kqTQz+UxSF67rn87nve7HwPM9BELRti6nJftJ5Su8vlP0ff/zh+z4WiKJIR1GUpqkkCpLUfr/P89z3fakXURS1bSu0q1Lq169fgI55nne7HZwZ6qEUqE0XQSN/d3c3TdMwDEEQCNDquu56va7ryg5hIkhxURTxOpIBXxZFId3Z9XrVuD7/t21bFEUUReM4om+6IWIuz3OqCYnveDyCPqhxmEK8RQzLTrDbOI7whMiNHKgJRPOXv/wlz/OqqiTcy7JkyEKX2zQNDW3TNDibpo/mbrIhmASbYHRWJ8j2+73neeIJW05OsIDjONM01XVN76u+m90gCOiQoAoB9NxA6YW4hkUsy1LyrFAVTKVk4pSmqRYaVSk1DAOxJW2/+maY4RLVd62l4cJWyKGUenp6ooqz2vF4FGiQpqnjOFjy/v4eI/i+nyTJ8/Mzb6zrWlh40g7FRHIJlh+G4XK50PpVVeWgbMl95EQWEqCSJAmt3TAMjImEvToej9uSt6WYBDZzJ05PHkSdokg2MwwDA0XIEbbE40EQzPN8vV6TJMnznFKLXr7odWgPIRXVN6yH/SqKom1bQcgkxDzPqXHcj0e+vr4KslffKYELceu6JtCbppEhkEzWuD8IAiCwFNllWYqiwIXqupaW6ysGYA0cx6ErYHVShG3b7+/v3M03u90OamjbpNLlQFkCLZmRCbom1wnHFgQBnsnKTBJYzfM8KakkZS7LsqIoenl5kc7mawM0spLytdYMBlmafsAYw9Z93z+fzxKFPJIkCa9nVsBTICjXddu27fue/DaOI27Z9z27EgWLHxI2aZqmaSohBGGllHp4eFDfQ4avOQuuxotBy6yFfPBKURRhd1h5hAAbszGgqywKsUPdkFy+lY93kTz6vt/ys9KTsHP0OAwDmfrj44Pkpr6zi357ewvDkJgA3ymZn2n9/PyMcYiELTrSWgPuoTgdxzmfz1vu4LeLICmKQko4PIiMgnBmKZ3cI3YOgoCWH2nhr5RSelvw6SFlSKO1RmFUwTzPcRVEkbKFB7dt+/j4uK6rFC+5aPzZNtVQpqgwXMB1y7LAuYw81nX1fR+NgJp5CvVDulRVpamIWZZJS4l3MuWWed5ut5PSJgWBxk36mKIosixb13WeZ2gioSpOp5OEqTQb4EVyImQMjT/G0VpTGWDqgYk4IS14lmWPj49fQayUenl5ga6iRxPCUCkFgY41mSsSSRzq2LIVr6+vbO/29hbOGMMCIsQCYhnCHaXSo10uF9xMa03lgiJgDqu+US2u3jSNvlwuOCVZEg5ZGi5UdX9/z2QO9Us2RHqwhrAseDNkDIUJC+ONy7JIxnt8fAR7w1mcTicSFwNfJsS2bQ/DQAqCpaQFF7yoYc/lEs9msuv7PiMGJKawD8OwPYAD7JEV1nVNkuTHjx+4L3Sd/IqT8Djvur29Zb4PAcMebNv+/PwEt7IfpgqEgQgZx7H+7QQNFYoHRCD2Wte1DOvV37aO20v4Qxlw4CFbHclRGKWUMQaWRWt9Op0Ago7jEMGASGYXYkOKGny4loMZMmUApf1fmaIo+spcWhPikr7wWgIacSWFi3dxEVqEE8Ej6IuZECeFOGgjdJgMbKCPhmFg/lJVlXZdl8CFmOc1uARTZVgkcRhGlGhuq37adpCS67pBEPDr+/s70IDgqaqKI0P4J/0G+uJ+jA+gINhc1yUvoSZcVM5i6GmaIMHVd4ZZlgX/gUsry1IQMiNe4BpUBYCH29CfOD37JBKIH2IJ03HIgskp833hRpEYNSdJwiGiLMsOhwOtCDthEvk1YiJR0JgytKyqipG/1HwSMDQt85XD4YDpXded55mR85bVYc9CgzqOg8eO48hEC9UAWCQxXK9XHucwHxxEWZbLstAq0u7e3d0ZY77AM9wlmFGclZwIi0j+3o7GGNkqpR4eHoAVgjHRIgDOGHN7e8t5PaEClFL7/V5mMxS+ZVnYQxzHEvfbITxlntBigO04jhZpPj4+RG1ysV2lFDyhHAriV04+0fLBdQomI4WzbbLh1iy+759OJznywVNMMrdBCMjDyXk7533YJFMVLW0KYFg4MAzddZ30o4SaIBk0Jz07PBSrz/Ns2zZoXnB/3/fSqmNtOXDJxoQGlqrCB6HKLctiADdNE1PAuq41OoBt3O12dAK86XA4MDfgxA75YZomXsMoVk5S0hmT9fB13sqRRXp5aURJoLIOfBRCM0qM4xhqFQKG/D6OI4gI3aPNryn88XhkGzA/ZO7T6QSjLcxh3/fSQ4JPhMCDVR7HUcCSgD8QG+cV1TcGUZuCyqCazzgkzTtvlB7V87zD4UBW5Ndpmr5ioK5rSbr0LmoDypVSkno5xSmDE+mh5cCY+ImwueSuLadNLnp8fBRsB0GdpmkURb/NVsTvtdaXy4U6K8envg7vZll2Pp+xC+yQsF0CJAG60n+JjpVSjuMIbSbnjtkqRxkof3IwCYhWluWff/6J88DQUO8YCqJjNEvuotOAV3Vdd7/f+76veQezaLxT5u8sLQcfmA9sdZNl2TAMnG0G9nF2SDr9w+EgMITV1nWVqWNVVWmaArblHBUSMz2Q02vYk1jnVC0ktOd51v/8+z9BUINwfsN26hvMcJyOvBGGIQwZvJ8EAPeDWLY1C3gjc6Tt2Ry5oIPkNjApZN71eqVxJxJ4NaBoXVdN/qaNEiX9tjrhT54Frv769QuqghsABfgVx4RAEKgTaKS1Jl/xiEzQ1Pd8W33jViyA9GyJOJYkJj2x53l/HXTP87w9LSUjEPyB0+IkqMfHR4ZwgpGwLJGNfTAOxZ+ZHzCYM/JKKSY0QgG+vb2pb1oWDRpjONAqapLNyzda6/8F3U47CrRZPE0AAAAASUVORK5CYII=';


const base64GrassSide = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAA/ElEQVR4nKVRMYrDMBCcCJUqhEASBD3AhZtU+UHK6+4d96B7Rt7gH7gwpHUjG4QLPSDFhL3luCacCrHenRnNrE+f31e8c8xb6H8TLpMDcHsUFlKf7z8A+6dMbf3FT6it5+DyhNp6RTcifJkccfOy5uBujxKTn5dVS+TgLNHnO+LgAeQJCKitE0GQLoxQ52WNyQuOZxwK5YVmc3AC2rcjBxeTBxCT37eDBW9atWSzy9a+HUTzrq2PQ+HotVYOKM/XqC1Z52Udh8Jglu61bzEjqjq0lUBSCJ9W+UnPAIzWEBqbRHNRwjl9fVx/7VvWwMRaLgdn9Os6Bn8LR9rFE+aumkdPC7LqAAAAAElFTkSuQmCC';
const base64Leaves = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHUlEQVR4nF2STUiVYRCFn/frYhmkFkF4IWp5CIuCNtUiWrTLhdCiIAwkIQRBjUKxWkQ/coOiH9xlZD9EGRa2qEVEq9pGm6FNZEIt0hJvqGROi3fAbDXzfmdmvjNnTtI5OduA18AssA/ssCWNyVkAa7Gku3Ic+ABsAuqAtWDNlhKARuR20HLeJWcH2FFLOiOnAexEYJfk/ASmgT3AFBQakTMBui0HoDGau+Q0AR9Bj+R6JmddNJeDzRy5UTfkuinX5RgC6OxSDqBeue7lbxpYwgqqYJ2WqAdWRfETOSv/yQEmwY5Y0hU5X0FDcg3KS9ZpSe1yDGiKsa9CKICXEVdHrAMSWFvWpaQeOduBH8CKLJT1ZRCAzTnYNUsalVtL6AOoQ15QA9ZqiUWgCtZnSRW5eoN6FXRfrh45M6B2OeXQYRckdcvZukRpmXBP5XwH3gH1wBbgN/A+3g1QUAb+xI3/b14APgH7gRIwE+8CbMAS81CiFqzdkh7EXsNyZoEXwM7Q4A3ZgY1gXWGqUTnjkN1WC3wDux7gmNyaIx+WW6slXYzTzgHTYJWM56KHcju0XAMNyZkHavN1WAQ+A+vBOizpvNxOWyr0PFPWY7n6Y41bcmuzxBpgCngLjAOeGahfTk3+UWEHLNEA/AK7YElX5UwGjTngC9igJWaADUA519kpSzopL1TJ5qAIE3XHQMCOWWJj3Hw32HFLTMSKd+Tshb8nePqiK0m1SgAAAABJRU5ErkJggg==';
const base64WoodTop = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAiElEQVR4nIVSyQ2AMAwLyHN4MGZiHCbyJDwqmUDSwqtKfNVlu85DUkSQHIf28xaSSEaEaRUtyTB4lGlV3hgMrzxqHUgOJCw5MzH0ibQ2yfIkUXfVIau8CJ9bth3sLaGF/hDauqaRFk/+InzuZ3KeIFI5rq9mMwZGZE5N+NS6lq8myOlj/rd6dQNIPYeW1hpJnwAAAABJRU5ErkJggg==';

const textureLoader = new THREE.TextureLoader();
textureLoader.magFilter = THREE.NearestFilter; // for crispy pixels

const matGrassTop = new THREE.MeshLambertMaterial({ map: textureLoader.load(base64Grass) });
const matGrassSide = new THREE.MeshLambertMaterial({ map: textureLoader.load(base64GrassSide) });
const matDirt = new THREE.MeshLambertMaterial({ map: textureLoader.load(base64Dirt) });
const matStone = new THREE.MeshLambertMaterial({ map: textureLoader.load(base64Stone) });
const matWoodSide = new THREE.MeshLambertMaterial({ map: textureLoader.load(base64Wood) });
const matWoodTop = new THREE.MeshLambertMaterial({ map: textureLoader.load(base64WoodTop) });
const matLeaves = new THREE.MeshLambertMaterial({ map: textureLoader.load(base64Leaves), transparent: true });

const materials = {
    grass: [matGrassSide, matGrassSide, matGrassTop, matDirt, matGrassSide, matGrassSide],
    dirt: matDirt,
    stone: matStone,
    wood: [matWoodSide, matWoodSide, matWoodTop, matWoodTop, matWoodSide, matWoodSide],
    leaves: matLeaves
};


// Voxel World Logic
const worldSize = 32;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const blocks = []; // To check collisions and raycasting
const simplex = new SimplexNoise();

function generateWorld() {
    for (let x = -worldSize/2; x < worldSize/2; x++) {
        for (let z = -worldSize/2; z < worldSize/2; z++) {
            // Simple terrain generation - increase amplitude and lower frequency for hills
            let y = Math.floor(simplex.noise2D(x * 0.03, z * 0.03) * 6);

            // Surface block
            addBlock(x, y, z, materials.leaves);
            // Dirt below
            addBlock(x, y-1, z, materials.dirt);
            addBlock(x, y-2, z, materials.dirt);
            // Stone below that
            addBlock(x, y-3, z, materials.stone);

            // Tree generation
            if (y > 0 && Math.random() > 0.95) {
                let treeHeight = Math.floor(Math.random() * 2) + 3; // 3 to 4 blocks high
                for (let i = 1; i <= treeHeight; i++) {
                    addBlock(x, y + i, z, materials.wood);
                }

                // Leaves (simulated with grass texture for now)
                for (let lx = -1; lx <= 1; lx++) {
                    for (let lz = -1; lz <= 1; lz++) {
                        for (let ly = 0; ly <= 1; ly++) {
                            // Leave out corners for a rounder look
                            if (Math.abs(lx) + Math.abs(lz) + ly === 3) continue;
                            if (lx === 0 && lz === 0 && ly === 0) continue; // Skip trunk position
                            addBlock(x + lx, y + treeHeight + ly, z + lz, materials.grass);
                        }
                    }
                }
            }
        }
    }
}

function addBlock(x, y, z, material) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    blocks.push(mesh);
}

generateWorld();


// Highlight Box
const outlineGeometry = new THREE.EdgesGeometry(geometry);
const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
const highlightBox = new THREE.LineSegments(outlineGeometry, outlineMaterial);
highlightBox.visible = false;
scene.add(highlightBox);

// Player/Camera Logic
const player = {
    height: 1.6,
    speed: 4.0,
    jumpForce: 7.0,
    velocity: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    onGround: false
};
camera.position.set(0, 5, 0);

// Physics & Gravity
const gravity = -15.0;
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();

// --- Mobile Controls (Touch) ---
let moveForward = 0, moveRight = 0;
let isLookTouching = false;
let previousTouch = { x: 0, y: 0 };

// Joystick
const zone = document.getElementById('controls-zone');
const stick = document.getElementById('stick');
let joyActive = false;
let joyCenter = {x:0, y:0};

zone.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joyActive = true;
    const touch = e.changedTouches[0];
    const rect = zone.getBoundingClientRect();
    joyCenter = { x: rect.left + rect.width/2, y: rect.top + rect.height/2 };
    updateJoystick(touch.clientX, touch.clientY);
}, {passive: false});

zone.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if(!joyActive) return;
    updateJoystick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
}, {passive: false});

zone.addEventListener('touchend', (e) => {
    e.preventDefault();
    joyActive = false;
    stick.style.transform = `translate(0px, 0px)`;
    moveForward = 0; moveRight = 0;
}, {passive: false});

function updateJoystick(tx, ty) {
    let dx = tx - joyCenter.x;
    let dy = ty - joyCenter.y;
    const maxDist = 35;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
    }

    stick.style.transform = `translate(${dx}px, ${dy}px)`;

    // Normalize to -1.0 to 1.0
    moveRight = dx / maxDist;
    moveForward = -dy / maxDist; // Invert Y
}

// Camera Look (Right side of screen)
document.addEventListener('touchstart', (e) => {
    if(e.target.closest('#controls-zone') || e.target.closest('#action-buttons') || e.target.closest('#inventory')) return;
    // Only allow look on right half of screen
    if(e.touches[0].clientX < window.innerWidth / 2) return;
    isLookTouching = true;
    previousTouch.x = e.touches[0].clientX;
    previousTouch.y = e.touches[0].clientY;
}, {passive: false});

document.addEventListener('touchmove', (e) => {
    if(!isLookTouching) return;
    e.preventDefault();
    const touch = e.touches[0];

    // Ignore touch on the left half of the screen (joystick area) if needed, but we rely on target
    let movementX = touch.clientX - previousTouch.x;
    let movementY = touch.clientY - previousTouch.y;

    const lookSpeed = 0.005;

    // Euler angles for camera rotation
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);

    euler.y -= movementX * lookSpeed * 1.5; // Increased sensitivity
    euler.x -= movementY * lookSpeed * 1.5;

    // Clamp vertical look
    euler.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, euler.x));

    camera.quaternion.setFromEuler(euler);

    previousTouch.x = touch.clientX;
    previousTouch.y = touch.clientY;
}, {passive: false});

document.addEventListener('touchend', () => { isLookTouching = false; });

// Action Buttons
document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (player.onGround) player.velocity.y = player.jumpForce;
});

// Inventory selection
let currentMaterial = materials.grass;
const slots = document.querySelectorAll('.slot');
slots.forEach(slot => {
    slot.addEventListener('touchstart', (e) => {
        slots.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        const type = e.target.getAttribute('data-type');
        currentMaterial = materials[type];
    });
});

// Interaction (Build / Break)
function getTargetBlock() {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera); // Center of screen
    const intersects = raycaster.intersectObjects(blocks);
    if (intersects.length > 0 && intersects[0].distance < 6) {
        return intersects[0];
    }
    return null;
}

document.getElementById('btn-break').addEventListener('touchstart', (e) => {
    e.preventDefault();
    const target = getTargetBlock();
    if (target) {
        scene.remove(target.object);
        blocks.splice(blocks.indexOf(target.object), 1);
    }
});

document.getElementById('btn-build').addEventListener('touchstart', (e) => {
    e.preventDefault();
    const target = getTargetBlock();
    if (target) {
        const pos = target.object.position.clone().add(target.face.normal);
        // Simple overlap check (don't build inside yourself)
        if (Math.abs(pos.x - camera.position.x) < 0.8 && Math.abs(pos.z - camera.position.z) < 0.8 && pos.y < camera.position.y && pos.y > camera.position.y - player.height) {
            return;
        }
        addBlock(pos.x, pos.y, pos.z, currentMaterial);
    }
});

// Main Loop
function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);

    // Physics
    player.velocity.y += gravity * delta;

    // Movement relative to camera direction
    player.direction.z = Number(moveForward);
    player.direction.x = Number(moveRight);
    player.direction.normalize();

    // Get camera looking direction (ignore Y for walking)
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);
    let rot = euler.y;

    // Calculate movement vector
    let moveZ = (Math.cos(rot) * player.direction.z - Math.sin(rot) * player.direction.x) * player.speed;
    let moveX = (Math.sin(rot) * player.direction.z + Math.cos(rot) * player.direction.x) * player.speed;

    // Super basic collision detection (Raycasting down)
    player.onGround = false;
    raycaster.set(camera.position, new THREE.Vector3(0, -1, 0));
    const intersects = raycaster.intersectObjects(blocks);

    if (intersects.length > 0 && intersects[0].distance < player.height && player.velocity.y <= 0) {
        player.velocity.y = 0;
        camera.position.y = intersects[0].object.position.y + 0.5 + player.height;
        player.onGround = true;
    } else {
        camera.position.y += player.velocity.y * delta;
    }

    // Apply horizontal movement (no wall collision yet for simplicity in prototype)


    // Apply horizontal movement
    camera.position.x -= moveX * delta;
    camera.position.z -= moveZ * delta;

    // Very Basic Wall Collision (Push back if inside block)
    for (let i = 0; i < blocks.length; i++) {
        let b = blocks[i];
        // Check if camera is inside block's AABB
        if (Math.abs(camera.position.x - b.position.x) < 0.8 &&
            Math.abs(camera.position.z - b.position.z) < 0.8 &&
            camera.position.y > b.position.y - 0.5 &&
            camera.position.y - player.height < b.position.y + 0.5) {

            // Push back
            camera.position.x += moveX * delta;
            camera.position.z += moveZ * delta;
            break; // Stop at first collision
        }
    }



    // Fall out of world reset
    if (camera.position.y < -20) {
        camera.position.set(0, 10, 0);
        player.velocity.y = 0;
    }


    // Update Highlight
    const target = getTargetBlock();
    if (target) {
        highlightBox.position.copy(target.object.position);
        highlightBox.visible = true;
    } else {
        highlightBox.visible = false;
    }

    renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
