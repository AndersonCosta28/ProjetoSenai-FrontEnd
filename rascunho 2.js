{/* <View style={estilo.t}>
                        <Text>ID: </Text>
                        <TextInput style={estilo.input}
                            editable={false}
                            defaultValue={Pessoa.idpessoa}
                            keyboardType="numeric"
                            onChangeText={Text => { validarCampo(); SetID(Text); validarCampo(); }}
                            onBlur={()=> {
                                validarCampo();
                            }}>

                            </TextInput>
                    </View> */}
                    {/* <View style={estilo.t}>
                        <Text>Nome: </Text>
                        <TextInput
                            style={estilo.input}
                            defaultValue={Pessoa.nome}
                            onChangeText={Text => {
                                validarCampo(); SetPessoa(prevPreferences => {
                                    return {
                                        ...prevPreferences, nome:
                                            String(Text).trim()
                                    }
                                }); validarCampo();
                            }}
                            onBlur={() => {
                                validarCampo();
                            }}></TextInput>
                    </View> */}
                    {/* <View style={estilo.t}>
                        <Text>Sobrenome: </Text><TextInput
                            style={estilo.input}
                            defaultValue={Pessoa.sobrenome}
                            onChangeText={Text => {
                                validarCampo(); SetPessoa(prevPreferences => {
                                    return {
                                        ...prevPreferences, sobrenome:
                                            String(Text).trim()
                                    }
                                });
                                validarCampo();
                            }} onBlur={() => {
                                validarCampo();
                            }}></TextInput>
                    </View> */}
                    {/* <View style={estilo.t}>
                        <Text>Telefone: </Text><TextInput style={estilo.input}
                            keyboardType="phone-pad"
                            defaultValue={Pessoa.telefone}
                            onChangeText={Text => {
                                validarCampo();
                                SetPessoa(prevPreferences => {
                                    return { ...prevPreferences, telefone: String(Text).trim() }
                                });
                                validarCampo();
                            }}
                            onBlur={() => {
                                validarCampo();
                            }}></TextInput>
                    </View> */}
                    {/* <View style={estilo.t}>
                        <Text>Email: </Text><TextInput style={estilo.input}
                            keyboardType="email-address"                            
                            defaultValue={Pessoa.email}
                            onChangeText={Text => {
                                validarCampo(); SetPessoa(prevPreferences => {
                                    return { ...prevPreferences, email: String(Text).trim() }
                                });
                                validarCampo();
                            }}
                            onBlur={Text => {
                                validarCampo();
                            }}></TextInput>
                    </View> */}

                    {/* <View style={estilo.t}>
                        <Text>Logradouro: </Text>
                        <TextInput
                            style={estilo.input}
                            value={infoCep.logradouro} />
                    </View> */}
                    {/* <View style={estilo.t}>
                        <Text>Complemento: </Text>
                        <TextInput style={estilo.input} defaultValue={infoCep.complemento} />
                    </View> */}
                    {/* <View style={estilo.t}>
                        <Text>Bairro: </Text>
                        <TextInput
                            style={estilo.input}
                            value={infoCep.bairro} />
                    </View> */}
                    {/* <View style={estilo.t}>
                        <Text>Cidade: </Text><TextInput style={estilo.input} value={infoCep.localidade} />
                    </View> */}
                     {/* <View style={estilo.t}>
                        <Text>UF:</Text>
                        <TextInput
                            style={estilo.input}
                            value={infoCep.uf} />
                    </View> */}
                     {/* <View style={estilo.t}>
                        <Text>Nº:</Text>
                        <TextInput
                            style={estilo.input}
                            defaultValue={infoCep.numero}
                            onChangeText={Text => setCep(prevPreferences => { return { ...prevPreferences, numero: Text, idendereco: idEndereco } })} />
                    </View> */}