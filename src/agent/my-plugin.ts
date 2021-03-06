import { IAgentPlugin } from 'daf-core'
import { IMyAgentPlugin, IMyAgentPluginFooArgs, IContext } from '../types/IMyAgentPlugin'
const pluginSchema = require('../../agent-plugin-schema')

/** 
 * {@inheritDoc IMyAgentPlugin}
 * @beta
 */
export class MyAgentPlugin implements IAgentPlugin {
  
  readonly schema = pluginSchema.credentialSubject.interfaces.IMyAgentPlugin

  readonly eventTypes = ['validatedMessage']
  
  readonly methods: IMyAgentPlugin = {
    myPluginFoo: this.myPluginFoo.bind(this)
  }

  public async onEvent(event: { type: string; data: any }, context: IContext) {
    console.log(event.data)
  }

  /** {@inheritDoc IMyAgentPlugin.myPluginFoo} */
  private async myPluginFoo(args: IMyAgentPluginFooArgs, context: IContext): Promise<string> {
    const didDoc = await context.agent.resolveDid({ didUrl: args.did })
    console.log(didDoc)
    return args.bar
  }
}